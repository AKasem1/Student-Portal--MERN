export interface Announcement {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    email: string;
    name?: string;
  };
  course?: string;
  priority: 'low' | 'medium' | 'high';
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAnnouncementRequest {
  title: string;
  content: string;
  course?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface UpdateAnnouncementRequest {
  title?: string;
  content?: string;
  course?: string;
  priority?: 'low' | 'medium' | 'high';
  isPublished?: boolean;
}
