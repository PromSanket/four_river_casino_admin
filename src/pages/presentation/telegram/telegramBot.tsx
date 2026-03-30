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
      end: new Date((selectedDate || new Date()).getTime() + 60 * 60 * 1000),
      content: formData.content,
      channel: formData.channel,
      image: formData.image ? URL.createObjectURL(formData.image) : undefined,
    };

    setEvents([...events, newEvent]);
    closeModal();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
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
          <button 
            className="btn btn-primary" 
            onClick={openCreateModal}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Create Event
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div style={{ height: 600 }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              selectable
              defaultView="month"
              views={['month', 'week', 'day']}
              style={{ height: '100%' }}
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create/Edit Event"
        className="modal-dialog modal-lg"
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          content: {
            position: 'relative',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '800px',
            margin: 'auto',
            inset: '50px',
          },
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title">Create/Edit Event</h5>
          <button type="button" className="btn-close" onClick={closeModal}></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Event Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="channel" className="form-label">Channel Selection</label>
              <select
                className="form-select"
                id="channel"
                value={formData.channel}
                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
              >
                {channels.map((channel) => (
                  <option key={channel.value} value={channel.value}>
                    {channel.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <MDEditor
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value || '' })}
                height={200}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image Upload</label>
              <input
                type="file"
                className="form-control"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {formData.image && (
                <div className="mt-2">
                  <small className="text-muted">Selected: {formData.image.name}</small>
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TelegramBot;