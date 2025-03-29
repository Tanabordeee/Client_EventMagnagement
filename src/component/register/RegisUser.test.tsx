import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisUser from "./RegisUser";
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

describe("RegisUser Component", () => {
  let navigate: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    navigate = vi.fn(); 
    (useNavigate as ReturnType<typeof vi.fn>).mockReturnValue(navigate);
    // Mock localStorage
    const localStorageMock = {
      getItem: vi.fn().mockReturnValue(null),
      setItem: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
  });

  it("ควรแสดงฟอร์มลงทะเบียน", async () => {
    render(
      <Router>
        <RegisUser />
      </Router>
    );

    // รอให้ loading spinner หายไป
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull(), { timeout: 3000 });

    expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("re-password")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("ควรเรียก API และนำทางไปหน้า login เมื่อลงทะเบียนสำเร็จ", async () => {
    const response = { data: { message: "Registration Successful", username: "testuser" } };
    mockAxios.post.mockResolvedValue(response);

    render(
      <Router>
        <RegisUser />
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
    fireEvent.change(screen.getByPlaceholderText("re-password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Register"));

    // รอให้แสดงข้อความสำเร็จ
    await waitFor(() =>
      expect(Swal.fire).toHaveBeenCalledWith({
        title: "Good job!",
        text: "Register success",
        icon: "success",
      })
    );

    // รอให้นำทางไปหน้า login หลังจาก 3 วินาที
    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/loginuser"), { timeout: 4000 });
  });

  it("ควรล้างรหัสผ่านเมื่อรหัสผ่านไม่ตรงกัน", async () => {
    render(
      <Router>
        <RegisUser />
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
    fireEvent.change(screen.getByPlaceholderText("re-password"), {
      target: { value: "password456" },
    });
    fireEvent.click(screen.getByText("Register"));

    // ตรวจสอบว่ารหัสผ่านถูกล้าง
    expect(screen.getByPlaceholderText("password")).toHaveValue("");
    expect(screen.getByPlaceholderText("re-password")).toHaveValue("");
  });

  it("ควรแสดงข้อความผิดพลาดเมื่อลงทะเบียนไม่สำเร็จ", async () => {
    mockAxios.post.mockRejectedValue(new Error("Registration failed"));

    render(
      <Router>
        <RegisUser />
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
    fireEvent.change(screen.getByPlaceholderText("re-password"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByText("Register"));

    await waitFor(() =>
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "error",
        title: "Oops...",
        text: "Register didn't Success!",
      })
    );
  });

  it("ควรนำทางไปหน้า login เมื่อกดปุ่ม Back", async () => {
    render(
      <Router>
        <RegisUser />
      </Router>
    );

    // รอให้ loading spinner หายไป
    await waitFor(() => expect(screen.queryByRole("status")).toBeNull(), { timeout: 3000 });

    fireEvent.click(screen.getByText("Back"));
    expect(navigate).toHaveBeenCalledWith("/loginuser");
  });

  it("ควรล้างข้อมูลทั้งหมดเมื่อลงทะเบียนไม่สำเร็จ", async () => {
    mockAxios.post.mockRejectedValue(new Error("Registration failed"));

    render(
      <Router>
        <RegisUser />
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
    fireEvent.change(screen.getByPlaceholderText("re-password"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByText("Register"));

    // รอให้แสดงข้อความผิดพลาด
    await waitFor(() =>
      expect(Swal.fire).toHaveBeenCalledWith({
        icon: "error",
        title: "Oops...",
        text: "Register didn't Success!",
      })
    );

    // ตรวจสอบว่าข้อมูลทั้งหมดถูกล้าง
    expect(screen.getByPlaceholderText("username")).toHaveValue("");
    expect(screen.getByPlaceholderText("email")).toHaveValue("");
    expect(screen.getByPlaceholderText("password")).toHaveValue("");
    expect(screen.getByPlaceholderText("re-password")).toHaveValue("");
  });
});
