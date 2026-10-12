/* ============================================================
   Shared types for the Modura admin panel
   ============================================================ */

/* ---------- API responses (same shape as backend/helpers/response.js) ---------- */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: FieldErrors;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedData<T> {
  items: T[];
  pagination: PaginationMeta;
}

export type FieldErrors = Record<string, string | undefined>;

/* ---------- Records ---------- */
export interface Admin {
  id: number;
  name: string;
  email: string;
  lastLoginAt?: string | null;
  status?: boolean;
}

export interface LoginResult {
  token: string;
  admin: Admin;
}

export interface PortfolioImage {
  id: number;
  image: string;
  imageUrl: string;
  sortOrder?: number;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface PortfolioAlbum {
  id: number;
  title: string;
  images: PortfolioImage[];
}

/** Generic record coming from any admin master endpoint. */
export interface ResourceRecord {
  id: number;
  status?: boolean | string;
  images?: PortfolioImage[];
  albums?: PortfolioAlbum[];
  imageType?: 'image' | 'album';
  faqs?: ServiceFaq[];
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export type ApplicationStatus = 'new' | 'shortlisted' | 'interviewed' | 'rejected';

export interface JobApplication {
  id: number;
  careerId: number | null;
  name: string;
  email: string;
  phone: string;
  experience: string | null;
  currentCtc: string | null;
  expectedCtc: string | null;
  noticePeriod: string | null;
  portfolioLink: string | null;
  coverLetter: string | null;
  status: ApplicationStatus;
  adminNotes: string | null;
  createdAt: string;
  career?: { id: number; jobTitle: string } | null;
}

export interface SeoPage {
  id: number;
  pageKey: string;
  pageName: string;
  metaTitle: string | null;
  metaKeyword: string | null;
  metaDescription: string | null;
  headScript: string | null;
  bodyScript: string | null;
  updatedAt: string;
}

export interface HomeCounter {
  id: number;
  projectCompleted: number;
  happyClient: number;
  qualifiedEngineers: number;
  yearsExperience: number;
  countriesServed: number;
  updatedAt?: string;
}

export interface DashboardData {
  counts: {
    services: number;
    portfolios: number;
    blogs: number;
    applications: number;
    newApplications: number;
    activeJobs: number;
    contactInquiries: number;
    projectInquiries: number;
    getInTouchInquiries: number;
  };
  recentApplications: Pick<JobApplication, 'id' | 'name' | 'email' | 'status' | 'createdAt' | 'career'>[];
  recentBlogs: { id: number; title: string; status: 'draft' | 'published'; createdAt: string }[];
}

/* ---------- Module (master) configuration ---------- */
export interface Option {
  value: string;
  label: string;
}

/** Loads dropdown options from an admin endpoint (?all=1). */
export interface OptionsSource {
  endpoint: string;
  labelKey?: string;
}

export type FieldType =
  | 'text' | 'number' | 'date' | 'url' | 'email' | 'textarea' | 'editor' | 'select'
  | 'image' | 'file' | 'gallery' | 'albums' | 'toggle' | 'faqs' | 'code' | 'section';

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  optional?: boolean;
  full?: boolean;
  hint?: string;
  note?: string;
  placeholder?: string;
  maxLength?: number;
  default?: string | number | boolean;
  options?: Option[];
  optionsFrom?: OptionsSource;
  small?: boolean;
  onLabel?: string;
  offLabel?: string;
  /** gallery: allow only ONE image (a new upload replaces the current one) */
  single?: boolean;
  /** Show this field only when another field has a given value, e.g. { field: 'imageType', value: 'album' } */
  showWhen?: { field: string; value: string };
}

export type ColumnType = 'text' | 'image' | 'status' | 'date' | 'enum' | 'star' | 'rating';

export interface ColumnConfig {
  key: string;
  label: string;
  type?: ColumnType;
  options?: Option[];
  badge?: boolean;
}

export interface FilterConfig {
  name: string;
  label: string;
  options?: Option[];
  optionsFrom?: OptionsSource;
}

export interface ModuleConfig {
  title: string;
  singular: string;
  endpoint: string;
  columns: ColumnConfig[];
  fields: FieldConfig[];
  filters?: FilterConfig[];
  tabs?: { name: string; options: Option[] };
  noStatusFilter?: boolean;
  /** Portfolio: show a "+" action on album rows to add a new album directly */
  albumQuickAdd?: boolean;
}

export interface NavGroup {
  group: string;
  items: { label: string; href: string }[];
}

/* ---------- Form values ---------- */
export interface GalleryValue {
  existing: PortfolioImage[];
  added: File[];
  removed: number[];
}

/** One album in the portfolio album editor. `key` is a local id for React lists. */
export interface AlbumValue {
  key: string;
  id?: number;
  title: string;
  existing: PortfolioImage[];
  added: File[];
  removed: number[];
}

export type FieldValue = string | boolean | File | null | GalleryValue | ServiceFaq[] | AlbumValue[];

export type FormValues = Record<string, FieldValue>;
