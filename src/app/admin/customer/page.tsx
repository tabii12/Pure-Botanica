"use client";
import { useEffect, useState } from "react";
import "./customer.css";

export default function Customer() {
  interface Customer {
    role: string;
    _id: string;
    username: string;
    email: string;
    createdAt: string;
    status: string;
  }

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://api-zeal.onrender.com/api/users")
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter((customer: Customer) => customer.role === "user");
        setCustomers(filteredData);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const openModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const updateCustomerInfo = async () => {
    if (!selectedCustomer) return;

    try {
      const res = await fetch(`/api/users/${selectedCustomer._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: selectedCustomer.status,
          role: selectedCustomer.role,
        }),
      });

      if (!res.ok) throw new Error("Cập nhật thất bại");

      setCustomers((prev) =>
        prev.map((c) => (c._id === selectedCustomer._id ? selectedCustomer : c))
      );

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="title_container">
        <h1>KHÁCH HÀNG</h1>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên tài khoản</th>
              <th>E-Mail</th>
              <th>Trạng thái</th>
              <th>Role</th>
              <th>Ngày tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer._id}>
                <td>{index + 1}</td>
                <td>{customer.username}</td>
                <td>{customer.email}</td>
                <td>{customer.status}</td>
                <td>{customer.role}</td>
                <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn"
                    title="Chỉnh sửa"
                    onClick={() => openModal(customer)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.591 1.066c1.527-.943 3.365.895 2.422 2.422a1.724 1.724 0 001.066 2.591c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.591c-.943 1.527-.895 3.365-2.422 2.422a1.724 1.724 0 00-2.591 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.591-1.066c-1.527.943-3.365-.895-2.422-2.422a1.724 1.724 0 00-1.066-2.591c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.591c-.943-1.527.895-3.365 2.422-2.422a1.724 1.724 0 002.591-1.066z"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button className="page-item">«</button>
          <button className="page-item active">1</button>
          <button className="page-item">2</button>
          <button className="page-item">3</button>
          <button className="page-item">4</button>
          <button className="page-item">»</button>
        </div>
      </div>

      {isModalOpen && selectedCustomer && (
        <div className="modal">
          <div className="modal-content">
            <h3>Chỉnh sửa khách hàng</h3>
            <label>
              Trạng thái:
              <select
                value={selectedCustomer.status}
                onChange={(e) =>
                  setSelectedCustomer({ ...selectedCustomer, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <label>
              Role:
              <select
                value={selectedCustomer.role}
                onChange={(e) =>
                  setSelectedCustomer({ ...selectedCustomer, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <div className="modal-actions">
              <button onClick={updateCustomerInfo}>Lưu</button>
              <button onClick={() => setIsModalOpen(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
