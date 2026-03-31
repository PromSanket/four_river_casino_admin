import React, { useState, useEffect } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import SubHeader, {
	SubHeaderLeft,
} from '../../../layout/SubHeader/SubHeader';
import PaginationButtons from '../../../components/PaginationButtons';
import { FaEye, FaTrash, FaChevronLeft, FaChevronRight, FaEdit } from 'react-icons/fa';

// Types
interface Affiliate {
  id: string;
  name: string;
  email: string;
  username: string;
  telegram: string;
  status: string;
  createdAt: string;
  rakeShare: number;
}

interface AffiliateFormProps {
  onCancel: () => void;
  onSave: (item: Affiliate) => void;
  editItem: Affiliate | null;
}

export default function AffiliateManagement() {
//   const [activeTab, setActiveTab] = useState('stats');
  const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<Affiliate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [affiliateToDelete, setAffiliateToDelete] = useState<Affiliate | null>(null);

  // Initial dummy data
  const initialData: Affiliate[] = [
    { id: "AG001", name: "Guy Hawkins", email: "guy@example.com", username: "guyhawkins",telegram: "@guy", status: "Active", createdAt: "2025-01-01", rakeShare: 10 },
    { id: "AG002", name: "Wade Warren", email: "wade@example.com", username: "wadewarren", telegram: "@wade", status: "Active", createdAt: "2025-01-02", rakeShare: 15 },
    { id: "AG003", name: "Cody Fisher", email: "cody@example.com", username: "codyfisher", telegram: "@cody",  status: "Inactive", createdAt: "2025-01-03", rakeShare: 12 },
    { id: "AG004", name: "Kathryn Murphy", email: "kathryn@example.com", username: "kathrynmurphy", telegram: "@kathryn", status: "Active", createdAt: "2025-01-04", rakeShare: 8 },
    { id: "AG005", name: "Jacob Jones", email: "jacob@example.com", username: "jacobjones", telegram: "@jacob",  status: "Active", createdAt: "2025-01-05", rakeShare: 20 },
    { id: "AG006", name: "Leslie Alexander", email: "leslie@example.com", username: "lesliealexander", telegram: "@leslie",  status: "Active", createdAt: "2025-01-06", rakeShare: 18 },
    { id: "AG007", name: "Devon Lane", email: "devon@example.com", username: "devonlane",telegram: "@devon", status: "Inactive", createdAt: "2025-01-07", rakeShare: 5 },
  ];

  const [data, setData] = useState<Affiliate[]>(initialData);

  // ✅ FILTER DATA BY SEARCH
  const filteredAffiliates = data.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ PAGINATED DATA
  const paginatedAffiliates = filteredAffiliates.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleDelete = (affiliate: Affiliate) => {
    setAffiliateToDelete(affiliate);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (affiliateToDelete) {
      setData((prev) => prev.filter((d) => d.id !== affiliateToDelete.id));
    }
    setShowDeleteModal(false);
    setAffiliateToDelete(null);
  };

  const handleSave = (item: Affiliate) => {
    if (editItem) {
      setData((prev) => prev.map((d) => (d.id === item.id ? item : d)));
    } else {
      const newItem = { ...item, id: `AG${Date.now()}`, createdAt: new Date().toISOString().split('T')[0] };
      setData((prev) => [...prev, newItem]);
    }
    setShowModal(false);
    setEditItem(null);
  };

  return (
    <PageWrapper title='Affiliate Management'>
      <SubHeader>
        <SubHeaderLeft>
          <b>Affiliate Management</b>
        </SubHeaderLeft>
      </SubHeader>

      <Page>
        {/* ========================= */}
        {/* ✅ AFFILIATE LIST VIEW */}
        {/* ========================= */}
        {!selectedAffiliate && (
          <>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <h5>Affiliate List ({filteredAffiliates.length})</h5>
              <button
                onClick={() => {
                  setEditItem(null);
                  setShowModal(true);
                }}
                className='btn btn-primary'
              >
                + Create new
              </button>
            </div>

            <input
              type='text'
              placeholder='Search...'
              className='form-control mb-3 w-25'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            
            {/* TABLE */}
            <div className='card p-3 bg-dark text-light border-0'>
              <div className='table-responsive'>
                <table
                  className='table align-middle text-light'
                  style={{
                    borderCollapse: 'separate',
                    borderSpacing: '0 12px',
                  }}>

                  <thead>
                    <tr style={{ background: '#2a2d33' }}>
                      <th className='py-3'>Full Name</th>
                      <th>Telegram</th>
                      <th>Email</th>
                      <th>Rake Share</th>
                      <th>Created At</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedAffiliates.map((affiliate) => (
                      <tr
                        key={affiliate.id}
                        style={{
                          background: '#1f2228',
                          borderRadius: '12px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
                        }}>

                        <td className='py-3'>{affiliate.name}</td>
                        <td>{affiliate.telegram}</td>
                        <td>{affiliate.email}</td>
                        <td className='fw-semibold text-warning'>
                          {affiliate.rakeShare}%
                        </td>
                        <td>{affiliate.createdAt}</td>
                        <td>
                          <span className={`badge ${affiliate.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                            {affiliate.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className='btn btn-sm btn-warning me-2'
                            onClick={() => {
                              setEditItem(affiliate);
                              setShowModal(true);
                            }}
                            title='Edit'
                          >
                            <FaEdit />
                          </button>
                          <button
                            className='btn btn-sm btn-danger'
                            onClick={() => handleDelete(affiliate)}
                            title='Delete'
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ✅ PAGINATION UI */}
              <div className='d-flex justify-content-between align-items-center mt-3'>
                <span className='small text-light'>
                  Showing {(currentPage - 1) * perPage + 1} to{' '}
                  {Math.min(currentPage * perPage, filteredAffiliates.length)} of{' '}
                  {filteredAffiliates.length} items
                </span>

                <PaginationButtons
                  data={filteredAffiliates}
                  label='affiliates'
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  perPage={perPage}
                  setPerPage={setPerPage}
                />
              </div>
            </div>
          </>
        )}

 

        {/* ========================= */}
        {/* ✅ MODALS */}
        {/* ========================= */}
        
        {/* Add/Edit Modal */}
        {showModal && (
          <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editItem ? "Edit Affilate" : "Add New Affilate"}
                  </h5>
                  <button className="btn-close" onClick={() => {
                    setShowModal(false);
                    setEditItem(null);
                  }}></button>
                </div>
                <div className="modal-body">
                  <AffiliateForm
                    onCancel={() => {
                      setShowModal(false);
                      setEditItem(null);
                    }}
                    onSave={handleSave}
                    editItem={editItem}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-danger">
                    Delete Confirmation
                  </h5>
                  <button className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                </div>
                <div className="modal-body text-center">
                  <p className="fs-5">
                    Are you sure you want to delete this affliate?
                  </p>
                </div>
                <div className="modal-footer justify-content-center">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    No
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleDeleteConfirm}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Page>
    </PageWrapper>
  );
}

function AffiliateForm({ onCancel, onSave, editItem }: AffiliateFormProps) {
  const [form, setForm] = useState<Affiliate>(
    editItem || {
      id: "",
      name: "",
      email: "",
      username: "",
      telegram: "",
      status: "Active",
      createdAt: "",
      rakeShare: 0
    }
  );

  return (
    <div>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            placeholder="Name"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Affilate ID</label>
          <input
            placeholder="Affilate ID"
            className="form-control"
            value={form.id}
            disabled={!!editItem}
            onChange={(e) => setForm({ ...form, id: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Username</label>
          <input
            placeholder="Username"
            className="form-control"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Telegram Username</label>
          <input
            placeholder="Enter Telegram Username"
            className="form-control"
            value={form.telegram}
            onChange={(e) => setForm({ ...form, telegram: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Rake Share (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Rake Share %"
            className="form-control"
            value={form.rakeShare}
            onChange={(e) => setForm({ ...form, rakeShare: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end mt-3 gap-2">
        <button onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
        <button
          onClick={() => onSave(form)}
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
    </div>
  );
}
