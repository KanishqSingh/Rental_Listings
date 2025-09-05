import React, { useEffect, useState } from "react";
import TitleOwner from "../../Components/Owner/TitleOwner";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManageBooking = () => {
  const { axios } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/owner");
      console.log("data", data);

      data.success ? setBookings(data.bookings) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post("/api/bookings/change-status", {
        bookingId,
        status,
      });
      if (data.success) {
        toast.success(data.message || "Status updated");
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <TitleOwner title="Manage Bookings" />

      {/* Table for md+ screens */}
      <div className="hidden md:block max-w-5xl w-full overflow-x-auto mt-6 border border-gray-300 rounded-lg shadow-sm">
        <table className="w-full border-collapse text-left text-sm min-w-[700px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 font-medium text-gray-600">Property/Car</th>
              <th className="p-4 font-medium text-gray-600">Date Range</th>
              <th className="p-4 font-medium text-gray-600">Total</th>
              <th className="p-4 font-medium text-gray-600">Payment</th>
              <th className="p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => {
              const item = booking.property || booking.car || {};
              return (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt="property/car"
                      className="w-16 h-12 object-cover rounded-md border"
                    />
                    <p className="font-medium">{item.model || item.type}</p>
                  </td>

                  <td className="p-4">
                    <p className="text-sm">
                      {new Date(booking.startDate).toLocaleDateString()} →{" "}
                      {new Date(booking.returnDate).toLocaleDateString()}
                    </p>
                  </td>

                  <td className="p-4 text-gray-800 font-semibold">
                    ₹{booking.price}
                  </td>

                  <td className="p-4">
                    <button className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition">
                      Offline
                    </button>
                  </td>

                  <td className="p-4">
                    {booking.status === "pending" ? (
                      <select
                        onChange={(e) =>
                          changeBookingStatus(booking._id, e.target.value)
                        }
                        className="border rounded-md p-1 text-sm"
                        value={booking.status}
                      >
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Cards for mobile */}
      <div className="md:hidden mt-6 space-y-4">
        {bookings.map((booking, index) => {
          const item = booking.property || booking.car || {};
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 shadow-sm space-y-2"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt="property/car"
                  className="w-20 h-14 object-cover rounded-md border"
                />
                <div>
                  <p className="font-semibold">{item.model || item.type}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(booking.startDate).toLocaleDateString()} →{" "}
                    {new Date(booking.returnDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-gray-800 font-semibold">₹{booking.price}</p>

              <div className="flex justify-between items-center">
                <button className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition">
                  Offline
                </button>

                {booking.status === "pending" ? (
                  <select
                    onChange={(e) =>
                      changeBookingStatus(booking._id, e.target.value)
                    }
                    className="border rounded-md p-1 text-sm"
                    value={booking.status}
                  >
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="confirmed">Confirmed</option>
                  </select>
                ) : (
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageBooking;
