import React, { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import MDEditor from '@uiw/react-md-editor';
import Modal from 'react-modal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* ✅ IMPORTANT FIX */
Modal.setAppElement('#root');

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  content?: string;
  channel?: string;
  image?: string;
}

const TelegramBot = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Sample Event 1',
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000),
      content: 'Sample content for event 1',
      channel: 'general',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    channel: 'general',
    image: null as File | null,
  });

  const channels = [
    { value: 'general', label: 'General' },
    { value: 'announcements', label: 'Announcements' },
    { value: 'updates', label: 'Updates' },
    { value: 'news', label: 'News' },
  ];

  const handleSelectSlot = useCallback(({ start }: { start: Date }) => {
    setSelectedDate(start);
    setIsModalOpen(true);
  }, []);

  const handleSelectEvent = useCallback((event: Event) => {
    setFormData({
      title: event.title,
      content: event.content || '',
      channel: event.channel || 'general',
      image: null,
    });
    setSelectedDate(event.start);
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: '',
      content: '',
      channel: 'general',
      image: null,
    });
    setSelectedDate(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent: Event = {
      id: events.length + 1,
      title: formData.title,
      start: selectedDate || new Date(),
      end: new Date(
        (selectedDate || new Date()).getTime() + 60 * 60 * 1000
      ),
      content: formData.content,
      channel: formData.channel,
      image: formData.image
        ? URL.createObjectURL(formData.image)
        : undefined,
    };

    setEvents((prev) => [...prev, newEvent]);
    closeModal();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const openCreateModal = () => {
    setSelectedDate(new Date());
    setIsModalOpen(true);
  };

  return (
    <div className="container-fluid p-4">
      <div className="row mb-4">
        <div className="col">
          <h2>Telegram Bot Event Calendar</h2>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={openCreateModal}>
            + Create Event
          </button>
        </div>
      </div>

      <div style={{ height: 600 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          defaultView="month"
          views={['month', 'week', 'day']}
        />
      </div>

      {/* ✅ FIXED MODAL */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="modal-header">
          <h5>Create / Edit Event</h5>
          <button className="btn-close" onClick={closeModal}></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* TITLE */}
            <div className="mb-3">
              <label className="form-label">Event Title</label>
              <input
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                required
              />
            </div>

            {/* CHANNEL */}
            <div className="mb-3">
              <label className="form-label">Channel</label>
              <select
                className="form-select"
                value={formData.channel}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    channel: e.target.value,
                  }))
                }
              >
                {channels.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* EDITOR */}
            <div className="mb-3">
              <label className="form-label">Content</label>
              <MDEditor
                value={formData.content}
                onChange={(val) =>
                  setFormData((prev) => ({
                    ...prev,
                    content: val || '',
                  }))
                }
                height={200}
              />
            </div>

            {/* IMAGE */}
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageUpload}
              />

              {formData.image && (
                <p className="mt-2 text-success">
                  Selected: {formData.image.name}
                </p>
              )}
            </div>
          </div>

          <div className="modal-footer d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button type="submit" className="btn btn-primary">
              Save Event
            </button>
          </div>
        </form>
      </Modal>

      {/* ✅ REQUIRED CSS FIX */}
      <style>
        {`
        .custom-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 9999;
        }

        .custom-modal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: dark;
          padding: 20px;
          width: 800px;
          max-width: 95%;
          border-radius: 10px;
          z-index: 10000;
        }

        .rbc-calendar {
          z-index: 0 !important;
        }

        /* Navigation buttons (Today, Back, Next) */
        .rbc-toolbar button {
          color: white !important;
          background-color: #333 !important;
          border: 1px solid #555 !important;
        }

        .rbc-toolbar button:hover {
          background-color: #555 !important;
        }

        /* View switcher (Month, Week, Day) */
        .rbc-toolbar .rbc-btn-group button {
          color: white !important;
          background-color: #333 !important;
          border: 1px solid #555 !important;
        }

        .rbc-toolbar .rbc-btn-group button:hover {
          background-color: #555 !important;
        }

        .rbc-toolbar .rbc-btn-group button.rbc-active {
          background-color: #007bff !important;
          border-color: #007bff !important;
        }
      `}
      </style>
    </div>
  );
};

export default TelegramBot;