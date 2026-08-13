import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  apiFetch,
} from "../utils/api";
import {
  validateDepartmentRollNumber,
  validateStudentEmail,
} from "./departmentValidation";

function Signup() {

  const navigate =
    useNavigate();

  const [hostels, setHostels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isRoomDropdownOpen, setIsRoomDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    hostel: "",
    room: "",
    role: "student",
  });

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  /* ================= FLAGS ================= */

  const isStudent = formData.role === "student";
  const showHostelField = formData.role === "student" || formData.role === "attendant";

  /* ================= HOSTELS & ROOMS ================= */

  useEffect(() => {
    async function fetchHostels() {
      try {
        const data = await apiFetch("/api/hostels");
        setHostels(data.hostels || data.data || []);
      } catch (err) {
        console.error("Failed to fetch hostels:", err);
      }
    }
    fetchHostels();
  }, []);

  useEffect(() => {
    if (!formData.hostel) {
      setRooms([]);
      return;
    }
    async function fetchRooms() {
      try {
        const data = await apiFetch(`/api/auth/rooms/${encodeURIComponent(formData.hostel)}`);
        setRooms(data.rooms || []);
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      }
    }
    fetchRooms();
  }, [formData.hostel]);

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= REDIRECT ================= */

  const getRedirectPath = (role) => {
    switch (role) {
      case "guard":
        return "/guard";
      case "attendant":
        return "/attendant";
      case "warden":
        return "/wardenhostel";
      case "student":
      default:
        return "/student";
    }
  };

  /* ================= SIGNUP ================= */

  const handleSignup = async (e) => {
    e.preventDefault();

    if (isStudent) {
      if (
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        !formData.phone ||
        !formData.hostel ||
        !formData.room
      ) {
        setError("Please fill all fields");
        return;
      }
    } else {
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError("Please fill all fields");
        return;
      }

      if (showHostelField && !formData.hostel) {
        setError("Please select a hostel");
        return;
      }
    }

    if (!formData.email.endsWith("@nith.ac.in")) {
      setError("Use your college email ending in @nith.ac.in");
      return;
    }

      if (
        formData.password !==
        formData.confirmPassword
      ) {

        setError(
          "Passwords do not match"
        );

        return;
      }
      if (!acceptedPrivacy) {

  setError(
    "Please accept the Privacy Policy."
  );

  return;
}

      // If OTP hasn't been requested yet, request OTP first
      if (!isOtpSent) {
        try {
          setLoading(true);
          setError("");

          await apiFetch("/api/auth/send-otp", {
            method: "POST",
            body: JSON.stringify(formData),
          });

          setIsOtpSent(true);
          navigate("/verify-otp", {
            state: {
              email: formData.email,
              role: formData.role,
            },
          });
        } catch (err) {
          console.error(err);
          setError(err.message || "Failed to send OTP");
        } finally {
          setLoading(false);
        }
        return;
      }

      if (!otp) {
        setError("Please enter the OTP printed in your terminal");
        return;
      }

      try {

        setLoading(true);

        setError("");

        let payload;

        if (
          formData.role === "student"
        ) {

          payload = {

            role: "student",

            name: formData.name,

            email: formData.email,

            password:
              formData.password,

            phone: formData.phone,

            hostel:
              formData.hostel,

            room: formData.room,

            department:
              formData.department,

            rollno:
              formData.rollno,
            
            otp: otp,
          };
        }

        else if (
          formData.role === "attendant"
        ) {

          payload = {

            role: "attendant",

            name: formData.name,

            email: formData.email,

            password:
              formData.password,

            phone: formData.phone,

            hostel:
              formData.hostel,
            
            otp: otp,
          };
        }

        else if(formData.role === "guard"){

          payload = {

            role: "guard",

            name: formData.name,

            email: formData.email,

            password:
              formData.password,

            phone: formData.phone,
            
            otp: otp,
          }
        }else{
payload = {

            role: "warden",

            name: formData.name,

            email: formData.email,

            password:
              formData.password,

            phone: formData.phone,
            hostel:
              formData.hostel,
            
            otp: otp,
          }
          };

        const data =
          await apiFetch(
            "/api/auth/signup",
            {
              method: "POST",

              body: JSON.stringify(
                payload
              ),
            }
          );

        const savedUser = {

          ...(data.user || {}),

          role: payload.role,

          token: data.token,
        };

        localStorage.setItem(
          "token",
          data.token || ""
        );

        localStorage.setItem(
          "role",
          payload.role
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            savedUser
          )
        );

        navigate(
          getRedirectPath(
            payload.role
          )
        );

      } catch (err) {

        console.error(err);

        setError(
          err.message ||
          "Signup failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="min-h-screen flex bg-[#f5f5f5]">

      {/* ================= LEFT ================= */}

      <div className="hidden md:flex w-1/2 bg-[#5b0e0e] text-white items-center justify-center p-16">

        <div>

          <h1 className="text-5xl font-bold mb-5">

            Create Account

          </h1>

          <p className="text-lg text-gray-200 leading-8">

            Register to access hostel services,
            outpass requests and complaint management.

          </p>

        </div>

      </div>

      {/* ================= RIGHT ================= */}

      <div className="flex w-full md:w-1/2 items-center justify-center px-6">

        <form
          onSubmit={handleSignup}
          className="bg-white w-full max-w-md rounded-xl shadow-sm border border-gray-200 p-10 max-h-[100vh] overflow-y-auto"
        >

          <h2 className="text-3xl font-semibold text-[#5b0e0e] mb-8 text-center">

            Signup

          </h2>

          {error && (

            <p className="text-red-500 text-sm mb-4">

              {error}

            </p>
          )}

          {/* ================= ROLE ================= */}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md mb-6 outline-none focus:border-[#5b0e0e]"
          >

            <option value="student">

              Student

            </option>
            </select>

            {/* <option value="attendant">

              Attendant

            </option>

            <option value="guard">

              Security Guard

            </option>
             <option value="warden">

              warden

            </option>

          </select>
          {/* ================= COMMON / ROLE INPUTS ================= */}

          {!isStudent && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md mb-4 outline-none focus:border-[#5b0e0e]"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="College Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md mb-4 outline-none focus:border-[#5b0e0e]"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md mb-4 outline-none focus:border-[#5b0e0e]"
          />

          {/* ================= HOSTEL ================= */}

          {showHostelField && (
            <select
              name="hostel"
              value={formData.hostel}
              onChange={(e) => {
                handleChange(e);
                setFormData((prev) => ({ ...prev, hostel: e.target.value, room: "" }));
              }}
              className="w-full border border-gray-300 p-3 rounded-md mb-4 outline-none focus:border-[#5b0e0e]"
            >
              <option value="">Select Hostel</option>
              {hostels.map((hostel) => (
                <option key={hostel.id || hostel.name} value={hostel.name}>
                  {hostel.name}
                </option>
              ))}
            </select>
          )}

          {/* ================= ROOM (SEARCHABLE & SCROLLABLE DROPDOWN) ================= */}

          {isStudent && (
            <div className="relative mb-4">
              <input
                type="text"
                name="room"
                placeholder={formData.hostel ? "Type or Select Room Number" : "Select Hostel First"}
                value={formData.room}
                disabled={!formData.hostel}
                onFocus={() => setIsRoomDropdownOpen(true)}
                onChange={(e) => {
                  handleChange(e);
                  setIsRoomDropdownOpen(true);
                }}
                className="w-full border border-gray-300 p-3 rounded-md outline-none focus:border-[#5b0e0e] disabled:bg-gray-100"
              />
              {isRoomDropdownOpen && formData.hostel && (
                <div className="absolute left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  {rooms
                    .filter((r) =>
                      String(r.room_number || r)
                        .toLowerCase()
                        .includes(String(formData.room || "").toLowerCase())
                    )
                    .map((r) => {
                      const roomVal = String(r.room_number || r);
                      return (
                        <div
                          key={r.id || roomVal}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, room: roomVal }));
                            setIsRoomDropdownOpen(false);
                          }}
                          className="p-2.5 hover:bg-[#5b0e0e] hover:text-white cursor-pointer text-sm"
                        >
                          Room {roomVal}
                        </div>
                      );
                    })}
                  {rooms.length === 0 && (
                    <div className="p-2.5 text-xs text-gray-500 italic">
                      Type room number directly if not listed
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ================= PASSWORD ================= */}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md mb-4 outline-none focus:border-[#5b0e0e]"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-md mb-5 outline-none focus:border-[#5b0e0e]"
          />

          {/* ================= OTP INPUT ================= */}

          {isOtpSent && (
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP (Check terminal)"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-[#5b0e0e] p-3 rounded-md mb-5 outline-none focus:border-[#5b0e0e]"
            />
          )}

          {/* ================= PRIVACY ================= */}

<div className="flex items-start gap-2 mb-5">

  <input
    id="privacy"
    type="checkbox"
    checked={acceptedPrivacy}
    onChange={(e) =>
      setAcceptedPrivacy(e.target.checked)
    }
    className="mt-1 h-4 w-4 accent-[#5b0e0e]"
  />

  <label
    htmlFor="privacy"
    className="text-sm text-gray-600 leading-5"
  >
    I agree to the{" "}
    <span className="font-semibold text-[#5b0e0e]">
      Privacy Policy
    </span>{" "}
    and Hostel Rules.
  </label>

</div>

{/* ================= BUTTON ================= */}

<button
  type="submit"
  disabled={loading}
  className="w-full bg-[#5b0e0e] hover:bg-[#741616] transition text-white py-3 rounded-md disabled:opacity-50"
>

            {loading
              ? isOtpSent
                ? "Creating Account..."
                : "Sending OTP..."
              : isOtpSent
              ? "Verify OTP & Create Account"
              : "Get OTP & Create Account"}

          </button>

          {/* ================= LOGIN ================= */}

          <p className="text-center text-gray-600 mt-6">

            Already have an account?{" "}

            <Link
              to="/signin"
              className="text-[#5b0e0e] font-medium"
            >

              Login

            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Signup;