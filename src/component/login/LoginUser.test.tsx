import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginUser from "./LoginUser";
import axios from "axios";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

vi.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

vi.mock("sweetalert2", () => ({
  default: {
    fire: vi.fn(),
  },
  fire: vi.fn(),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal() as typeof import("react-router-dom");
  return {
    ...actual,
    BrowserRouter: actual.BrowserRouter,
    useNavigate: vi.fn(),
  };
});

describe("LoginUser Component", () => {
  let navigate: ReturnType<typeof vi.fn>;
  let localStorageMock: { getItem: ReturnType<typeof vi.fn>; setItem: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    navigate = vi.fn(); 
    (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(navigate);
    // Mock localStorage
    localStorageMock = {
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
  });

  it("ควรแสดงฟอร์มเข้าสู่ระบบ", async () => {
    render(
      <Router>
        <LoginUser />
      </Router>
    );

    // รอให้ loading spinner หายไป
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull(), { timeout: 3000 });

    expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("ควรเรียก API และนำทางไปหน้า user เมื่อเข้าสู่ระบบสำเร็จ", async () => {
    const response = { data: { message: "Login Successfully", user: { userId: "12345" } } };
    mockAxios.post.mockResolvedValue(response);

    render(
      <Router>
        <LoginUser />
      </Router>
    );

    // รอให้ loading spinner หายไป
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull(), { timeout: 3000 });

    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Login"));

    // รอและตรวจสอบการทำงานกับ localStorage
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith("user", "12345");
    });

    // รอให้นำทางไปหน้า user
    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/user"));
  });

  it("ควรแสดงข้อความผิดพลาดเมื่อเข้าสู่ระบบไม่สำเร็จ", async () => {
    mockAxios.post.mockRejectedValue(new Error("Login failed"));

    render(
      <Router>
        <LoginUser />
      </Router>
    );

    // รอให้ loading spinner หายไป
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull(), { timeout: 3000 });

    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() =>
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "error",
        title: "Oops...",
        text: "Login didn't Success!",
      })
    );
  });

  it("ควรนำทางไปหน้า register เมื่อกดปุ่ม Register", async () => {
    render(
      <Router>
        <LoginUser />
      </Router>
    );

    // รอให้ loading spinner หายไป
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull(), { timeout: 3000 });

    fireEvent.click(screen.getByText("Register"));
    expect(navigate).toHaveBeenCalledWith("/regisuser");
  });

  it("ควรนำทางไปหน้าแรกเมื่อกดปุ่ม Back", async () => {
    render(
      <Router>
        <LoginUser />
      </Router>
    );

    // รอให้ loading spinner หายไป
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull(), { timeout: 3000 });

    fireEvent.click(screen.getByText("back"));
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("ควรล้างข้อมูลทั้งหมดเมื่อเข้าสู่ระบบไม่สำเร็จ", async () => {
    mockAxios.post.mockRejectedValue(new Error("Login failed"));

    render(
      <Router>
        <LoginUser />
      </Router>
    );

    // รอให้ loading spinner หายไป
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull(), { timeout: 3000 });

    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByText("Login"));

    // รอให้แสดงข้อความผิดพลาด
    await waitFor(() =>
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "error",
        title: "Oops...",
        text: "Login didn't Success!",
      })
    );

    // ตรวจสอบว่าข้อมูลทั้งหมดถูกล้าง
    expect(screen.getByPlaceholderText("username")).toHaveValue("");
    expect(screen.getByPlaceholderText("email")).toHaveValue("");
    expect(screen.getByPlaceholderText("password")).toHaveValue("");
  });

  it("ควรตรวจสอบการยืนยันผู้ใช้เมื่อมี userId ใน localStorage", async () => {
    // Mock localStorage ให้มี userId
    localStorageMock = {
      getItem: vi.fn().mockReturnValue("12345"),
      setItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });

    // Mock การยืนยันผู้ใช้สำเร็จ
    const verifyResponse = { data: { isValid: true } };
    mockAxios.post.mockResolvedValue(verifyResponse);

    render(
      <Router>
        <LoginUser />
      </Router>
    );

    // รอให้ loading spinner หายไป
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull(), { timeout: 3000 });

    // ตรวจสอบว่าถูกนำทางไปหน้า user
    expect(navigate).toHaveBeenCalledWith("/user");
  });
});
