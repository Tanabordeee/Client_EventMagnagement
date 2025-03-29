import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginAdmin from "./LoginAdmin";
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

describe("LoginAdmin Component", () => {
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

  it("ควรแสดงฟอร์มเข้าสู่ระบบแอดมิน", async () => {
    render(
      <Router>
        <LoginAdmin />
      </Router>
    );

    // รอให้ loading spinner หายไป
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull(), { timeout: 3000 });

    expect(screen.getByPlaceholderText("adminname")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("ควรเรียก API และนำทางไปหน้า admin เมื่อเข้าสู่ระบบสำเร็จ", async () => {
    const response = { data: { message: "Login Successfully", user: { adminID: "12345" } } };
    mockAxios.post.mockResolvedValue(response);

    render(
      <Router>
        <LoginAdmin />
      </Router>
    );

    // รอให้ loading spinner หายไป
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull(), { timeout: 3000 });

    fireEvent.change(screen.getByPlaceholderText("adminname"), {
      target: { value: "adminuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "admin@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Login"));

    // รอและตรวจสอบการทำงานกับ localStorage
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith("admin", "12345");
    });

    // รอให้นำทางไปหน้า admin
    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/admin"));
  });

  it("ควรแสดงข้อความผิดพลาดเมื่อเข้าสู่ระบบไม่สำเร็จ", async () => {
    mockAxios.post.mockRejectedValue(new Error("Login failed"));

    render(
      <Router>
        <LoginAdmin />
      </Router>
    );

    // รอให้ loading spinner หายไป
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull(), { timeout: 3000 });

    fireEvent.change(screen.getByPlaceholderText("adminname"), {
      target: { value: "wrongadmin" },
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

  it("ควรนำทางไปหน้าแรกเมื่อกดปุ่ม Back", async () => {
    render(
      <Router>
        <LoginAdmin />
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
        <LoginAdmin />
      </Router>
    );

    // รอให้ loading spinner หายไป
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull(), { timeout: 3000 });

    fireEvent.change(screen.getByPlaceholderText("adminname"), {
      target: { value: "wrongadmin" },
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
    expect(screen.getByPlaceholderText("adminname")).toHaveValue("");
    expect(screen.getByPlaceholderText("email")).toHaveValue("");
    expect(screen.getByPlaceholderText("password")).toHaveValue("");
  });

  it("ควรแสดงข้อความผิดพลาดเมื่อ response ไม่สำเร็จ", async () => {
    const response = { data: { message: "Login Failed" } };
    mockAxios.post.mockResolvedValue(response);

    render(
      <Router>
        <LoginAdmin />
      </Router>
    );

    // รอให้ loading spinner หายไป
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull(), { timeout: 3000 });

    fireEvent.change(screen.getByPlaceholderText("adminname"), {
      target: { value: "adminuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "admin@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "password123" },
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
});
