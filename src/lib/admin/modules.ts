/**
 * All admin masters are described here. The generic list + form pages read this config,
 * so adding / changing a field is done in ONE place.
 *
 * Field / column types are defined in src/types/index.ts
 */

import type { ModuleConfig, NavGroup, Option, OptionsSource, FieldConfig } from '@/types/admin';
import { adminPath } from './paths';

const SLUG_HINT = 'Slug is auto-generated from this name and kept unique.';
const SEO_SECTION: FieldConfig = { name: '__seo', type: 'section', label: 'SEO Settings', note: '(all optional)' };

/** Portfolio types shown in the admin: 2D and 3D only ("Our Work" removed in v4). */
export const PORTFOLIO_TYPES: Option[] = [
  { value: '2d', label: '2D' },
  { value: '3d', label: '3D' },
];
/** Used only to show a label for old records that still have "our_work" saved. */
export const LEGACY_PORTFOLIO_TYPES: Option[] = [{ value: 'our_work', label: 'Our Work (old)' }, ...PORTFOLIO_TYPES];
export const IMAGE_TYPES: Option[] = [
  { value: 'image', label: 'Image' },
  { value: 'album', label: 'Album' },
];
export const JOB_TYPES: Option[] = [
  { value: 'full_time', label: 'Full Time' },
  { value: 'part_time', label: 'Part Time' },
  { value: 'internship', label: 'Internship' },
];
export const BLOG_STATUS: Option[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
];
export const APPLICATION_STATUS: Option[] = [
  { value: 'new', label: 'New' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'interviewed', label: 'Interviewed' },
  { value: 'rejected', label: 'Rejected' },
];

const categoryOptions: OptionsSource = { endpoint: '/admin/categories', labelKey: 'name' };

export const MODULES: Record<string, ModuleConfig> = {
  categories: {
    title: 'Manage Category',
    singular: 'Category',
    endpoint: '/admin/categories',
    columns: [
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'name', label: 'Category Name' },
      { key: 'status', label: 'Status', type: 'status' },
    ],
    fields: [
      { name: 'name', label: 'Category Name', type: 'text', required: true, full: true, hint: SLUG_HINT, maxLength: 150 },
      { name: 'image', label: 'Image', type: 'image', required: true },
      { name: 'status', label: 'Status', type: 'toggle', default: true },
    ],
  },

  services: {
    title: 'Manage Services',
    singular: 'Service',
    endpoint: '/admin/services',
    filters: [{ name: 'categoryId', label: 'All Categories', optionsFrom: categoryOptions }],
    columns: [
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'title', label: 'Service Title' },
      { key: 'category.name', label: 'Category' },
      { key: 'displayOrder', label: 'Order' },
      { key: 'status', label: 'Status', type: 'status' },
    ],
    fields: [
      { name: 'title', label: 'Service Title', type: 'text', required: true, hint: SLUG_HINT, maxLength: 200 },
      { name: 'categoryId', label: 'Category', type: 'select', required: true, optionsFrom: categoryOptions },
      { name: 'displayOrder', label: 'Display Order', type: 'number', default: 0 },
      { name: 'status', label: 'Status', type: 'toggle', default: true },
      { name: 'shortDescription', label: 'Short Description', type: 'textarea', full: true },
      { name: 'description', label: 'Full Description', type: 'editor', full: true },
      { name: 'image', label: 'Image', type: 'image', required: true, full: true },
      { name: 'faqs', label: 'Service FAQs (shown on Service Detail page)', type: 'faqs', full: true },
      SEO_SECTION,
      { name: 'metaTitle', label: 'Meta Title', type: 'text', optional: true, maxLength: 255 },
      { name: 'metaKeyword', label: 'Meta Keyword', type: 'text', optional: true, maxLength: 500 },
      { name: 'metaDescription', label: 'Meta Description', type: 'textarea', optional: true, full: true },
      { name: 'headScript', label: 'Head', type: 'code', optional: true, hint: 'Scripts / tags injected inside <head> of this service page' },
      { name: 'bodyScript', label: 'Body', type: 'code', optional: true, hint: 'Scripts injected at start of <body> of this service page' },
    ],
  },

  faqs: {
    title: 'FAQ',
    singular: 'FAQ',
    endpoint: '/admin/faqs',
    columns: [
      { key: 'question', label: 'Question' },
      { key: 'displayOrder', label: 'Order' },
      { key: 'status', label: 'Status', type: 'status' },
    ],
    fields: [
      { name: 'question', label: 'Question', type: 'text', required: true, full: true, maxLength: 500 },
      { name: 'answer', label: 'Answer', type: 'editor', required: true, full: true },
      { name: 'displayOrder', label: 'Display Order', type: 'number', default: 0 },
      { name: 'status', label: 'Status', type: 'toggle', default: true },
    ],
  },

  'portfolio-categories': {
    title: 'Manage Portfolio Category',
    singular: 'Portfolio Category',
    endpoint: '/admin/portfolio-categories',
    filters: [{ name: 'type', label: 'All Types', options: PORTFOLIO_TYPES }],
    columns: [
      { key: 'name', label: 'Category Name' },
      { key: 'type', label: 'Type', type: 'enum', options: LEGACY_PORTFOLIO_TYPES },
      { key: 'displayOrder', label: 'Order' },
      { key: 'status', label: 'Status', type: 'status' },
    ],
    fields: [
      { name: 'name', label: 'Category Name', type: 'text', required: true, maxLength: 150 },
      { name: 'type', label: 'Type', type: 'select', options: PORTFOLIO_TYPES, placeholder: 'Select type' },
      { name: 'displayOrder', label: 'Display Order', type: 'number', default: 0 },
      { name: 'status', label: 'Status', type: 'toggle', default: true },
    ],
  },

  portfolios: {
    title: 'Manage Portfolio',
    singular: 'Portfolio',
    endpoint: '/admin/portfolios',
    tabs: { name: 'type', options: [{ value: '', label: 'All' }, ...PORTFOLIO_TYPES] },
    filters: [{ name: 'imageType', label: 'All Image Types', options: IMAGE_TYPES }],
    albumQuickAdd: true,
    columns: [
      { key: 'coverUrl', label: 'Image', type: 'image' },
      { key: 'title', label: 'Project Title' },
      { key: 'category.name', label: 'Category' },
      { key: 'type', label: 'Type', type: 'enum', options: LEGACY_PORTFOLIO_TYPES },
      { key: 'imageType', label: 'Image Type', type: 'enum', options: IMAGE_TYPES },
      { key: 'clientName', label: 'Client' },
      { key: 'isFeatured', label: 'Featured', type: 'star' },
      { key: 'status', label: 'Status', type: 'status' },
    ],
    fields: [
      { name: 'title', label: 'Project Title', type: 'text', maxLength: 200 },
      { name: 'portfolioCategoryId', label: 'Portfolio Category', type: 'select', required: true, optionsFrom: { endpoint: '/admin/portfolio-categories', labelKey: 'name' } },
      { name: 'type', label: 'Type', type: 'select', options: PORTFOLIO_TYPES, placeholder: 'Same as category', hint: 'Leave empty to use the type of the selected category' },
      { name: 'clientName', label: 'Client Name', type: 'text', maxLength: 150 },
      { name: 'imageType', label: 'Image Type', type: 'select', required: true, options: IMAGE_TYPES, default: 'image', hint: 'Image = one single image · Album = several titled albums' },
      { name: 'gallery', label: 'Gallery Image', type: 'gallery', single: true, required: true, full: true, hint: 'Single image · a new upload replaces the current image', showWhen: { field: 'imageType', value: 'image' } },
      { name: 'albums', label: 'Albums', type: 'albums', required: true, full: true, hint: 'Each album needs a title and at least one image. The first image of the first album is the cover.', showWhen: { field: 'imageType', value: 'album' } },
      { name: 'isFeatured', label: 'Mark as Featured', type: 'toggle', default: false, onLabel: 'Featured', offLabel: 'Not featured' },
      { name: 'status', label: 'Status', type: 'toggle', default: true },
    ],
  },

  software: {
    title: 'Software Expertise',
    singular: 'Software',
    endpoint: '/admin/software',
    columns: [
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'name', label: 'Software Name' },
      { key: 'displayOrder', label: 'Order' },
      { key: 'status', label: 'Status', type: 'status' },
    ],
    fields: [
      { name: 'name', label: 'Software Name', type: 'text', required: true, maxLength: 150, hint: 'Slug is auto-generated from this name and kept unique.' },
      { name: 'displayOrder', label: 'Display Order', type: 'number', default: 0 },
      { name: 'shortDescription', label: 'Short Description', type: 'textarea', full: true },
      { name: 'longDescription', label: 'Long Description', type: 'editor', full: true },
      { name: 'image', label: 'Image', type: 'image', required: true },
      { name: 'status', label: 'Status', type: 'toggle', default: true },
      { name: 'faqs', label: 'Software FAQs (shown on Software Expertise page)', type: 'faqs', full: true },
    ],
  },

  team: {
    title: 'Our Team',
    singular: 'Team Member',
    endpoint: '/admin/team',
    columns: [
      { key: 'photo', label: 'Photo', type: 'image' },
      { key: 'name', label: 'Name' },
      { key: 'designation', label: 'Designation' },
      { key: 'displayOrder', label: 'Order' },
      { key: 'status', label: 'Status', type: 'status' },
    ],
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', required: true, maxLength: 150 },
      { name: 'designation', label: 'Designation', type: 'text', required: true, maxLength: 150 },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'displayOrder', label: 'Display Order', type: 'number', default: 0 },
      { name: 'bio', label: 'Short Bio', type: 'textarea', full: true },
      { name: 'photo', label: 'Photo', type: 'image' },
      { name: 'linkedinUrl', label: 'LinkedIn URL', type: 'url', placeholder: 'https://' },
      { name: 'socialUrl', label: 'Facebook / Instagram URL', type: 'url', placeholder: 'https://' },
      { name: 'status', label: 'Status', type: 'toggle', default: true },
    ],
  },

  clients: {
    title: 'Manage Our Clients',
    singular: 'Client',
    endpoint: '/admin/clients',
    columns: [
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'name', label: 'Client Name' },
      { key: 'websiteUrl', label: 'Website' },
      { key: 'displayOrder', label: 'Order' },
      { key: 'status', label: 'Status', type: 'status' },
    ],
    fields: [
      { name: 'name', label: 'Client Name', type: 'text', required: true, maxLength: 150 },
      { name: 'websiteUrl', label: 'Website URL', type: 'url', placeholder: 'https://' },
      { name: 'displayOrder', label: 'Display Order', type: 'number', default: 0 },
      { name: 'image', label: 'Image', type: 'image', required: true },
      { name: 'status', label: 'Status', type: 'toggle', default: true },
    ],
  },

  certifications: {
    title: 'Certification',
    singular: 'Certification',
    endpoint: '/admin/certifications',
    columns: [
      { key: 'file', label: 'Image', type: 'image' },
      { key: 'title', label: 'Certificate Title' },
      { key: 'issuedBy', label: 'Issued By' },
      { key: 'year', label: 'Year' },
      { key: 'status', label: 'Status', type: 'status' },
    ],
    fields: [
      { name: 'title', label: 'Certificate Title', type: 'text', required: true, maxLength: 200 },
      { name: 'issuedBy', label: 'Issued By', type: 'text', maxLength: 200 },
      { name: 'year', label: 'Year', type: 'number' },
      { name: 'displayOrder', label: 'Display Order', type: 'number', default: 0 },
      { name: 'description', label: 'Description', type: 'textarea', full: true },
      { name: 'file', label: 'Certificate Image / PDF', type: 'file', required: true },
      { name: 'status', label: 'Status', type: 'toggle', default: true },
    ],
  },

  blogs: {
    title: 'Manage Blog',
    singular: 'Blog',
    endpoint: '/admin/blogs',
    filters: [
      { name: 'status', label: 'All Status', options: BLOG_STATUS },
      { name: 'categoryId', label: 'All Categories', optionsFrom: categoryOptions },
      { name: 'serviceId', label: 'All Services', optionsFrom: { endpoint: '/admin/services', labelKey: 'title' } },
      { name: 'softwareId', label: 'All Software', optionsFrom: { endpoint: '/admin/software', labelKey: 'name' } },
    ],
    noStatusFilter: true,
    columns: [
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'title', label: 'Blog Title' },
      { key: 'category.name', label: 'Category' },
      { key: 'author', label: 'Author' },
      { key: 'createdAt', label: 'Created On', type: 'date' },
      { key: 'status', label: 'Status', type: 'enum', options: BLOG_STATUS, badge: true },
    ],
    fields: [
      { name: 'title', label: 'Blog Title', type: 'text', required: true, full: true, hint: SLUG_HINT, maxLength: 255 },
      { name: 'categoryId', label: 'Blog Category', type: 'select', required: true, optionsFrom: categoryOptions },
      { name: 'serviceId', label: 'Related Service', type: 'select', optional: true, optionsFrom: { endpoint: '/admin/services', labelKey: 'title' }, placeholder: '— None —' },
      { name: 'softwareId', label: 'Related Software Expertise', type: 'select', optional: true, optionsFrom: { endpoint: '/admin/software', labelKey: 'name' }, placeholder: '— None —' },
      { name: 'author', label: 'Author', type: 'text', maxLength: 150 },
      { name: 'description', label: 'Description', type: 'editor', required: true, full: true },
      { name: 'image', label: 'Image', type: 'image', required: true },
      { name: 'status', label: 'Status', type: 'select', options: BLOG_STATUS, default: 'draft' },
      SEO_SECTION,
      { name: 'metaTitle', label: 'Meta Title', type: 'text', optional: true, full: true, maxLength: 255 },
      { name: 'metaDescription', label: 'Meta Description', type: 'editor', small: true, optional: true, full: true },
      { name: 'headScript', label: 'Head', type: 'code', optional: true, hint: 'Scripts / tags injected inside <head> of this blog page' },
      { name: 'bodyScript', label: 'Body', type: 'code', optional: true, hint: 'Scripts injected at start of <body> of this blog page' },
    ],
  },

  testimonials: {
    title: 'Manage Testimonial',
    singular: 'Testimonial',
    endpoint: '/admin/testimonials',
    columns: [
      { key: 'photo', label: 'Photo', type: 'image' },
      { key: 'clientName', label: 'Client Name' },
      { key: 'company', label: 'Company' },
      { key: 'rating', label: 'Rating', type: 'rating' },
      { key: 'status', label: 'Status', type: 'status' },
    ],
    fields: [
      { name: 'clientName', label: 'Client Name', type: 'text', required: true, maxLength: 150 },
      { name: 'designation', label: 'Designation', type: 'text', maxLength: 150 },
      { name: 'company', label: 'Company', type: 'text', maxLength: 150 },
      { name: 'rating', label: 'Rating', type: 'select', required: true, default: '5', options: [5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: `${n} ★` })) },
      { name: 'testimonial', label: 'Testimonial', type: 'textarea', required: true, full: true },
      { name: 'photo', label: 'Client Photo', type: 'image' },
      { name: 'videoUrl', label: 'Video URL', type: 'url', optional: true, placeholder: 'https://' },
      { name: 'status', label: 'Status', type: 'toggle', default: true },
    ],
  },

  careers: {
    title: 'Manage Career',
    singular: 'Job',
    endpoint: '/admin/careers',
    columns: [
      { key: 'jobTitle', label: 'Job Title' },
      { key: 'department', label: 'Department' },
      { key: 'experience', label: 'Experience' },
      { key: 'location', label: 'Location' },
      { key: 'openings', label: 'Openings' },
      { key: 'lastDate', label: 'Last Date', type: 'date' },
      { key: 'status', label: 'Status', type: 'status' },
    ],
    fields: [
      { name: 'jobTitle', label: 'Job Title', type: 'text', required: true, maxLength: 200 },
      { name: 'department', label: 'Department', type: 'select', options: ['Design', 'Development', 'BIM', 'Structural', 'Marketing', 'Other'].map((v) => ({ value: v, label: v })), placeholder: 'Select department' },
      { name: 'experience', label: 'Experience Required', type: 'text', placeholder: 'e.g. 2-4 years', maxLength: 100 },
      { name: 'location', label: 'Location', type: 'text', maxLength: 150 },
      { name: 'jobType', label: 'Job Type', type: 'select', required: true, options: JOB_TYPES, default: 'full_time' },
      { name: 'openings', label: 'No. of Openings', type: 'number', required: true, default: 1 },
      { name: 'salaryRange', label: 'Salary Range', type: 'text', optional: true, maxLength: 100 },
      { name: 'lastDate', label: 'Last Date to Apply', type: 'date' },
      { name: 'description', label: 'Job Description', type: 'editor', full: true },
      { name: 'requirements', label: 'Skills / Requirements', type: 'textarea', full: true },
      { name: 'status', label: 'Status', type: 'toggle', default: true },
    ],
  },
};

/** Sidebar menu (hrefs of custom pages are listed directly). */
export const NAV: NavGroup[] = [
  { group: 'Main', items: [
    { label: 'Dashboard', href: adminPath('/dashboard') },
    { label: 'Home Counter', href: adminPath('/home-counter') },
  ] },
  { group: 'Services', items: [
    { label: 'Manage Category', href: adminPath('/categories') },
    { label: 'Manage Services', href: adminPath('/services') },
    { label: 'FAQ', href: adminPath('/faqs') },
  ] },
  { group: 'Portfolio', items: [
    { label: 'Manage Portfolio Category', href: adminPath('/portfolio-categories') },
    { label: 'Manage Portfolio', href: adminPath('/portfolios') },
  ] },
  { group: 'Company', items: [
    { label: 'Software Expertise', href: adminPath('/software') },
    { label: 'Our Team', href: adminPath('/team') },
    { label: 'Manage Our Clients', href: adminPath('/clients') },
    { label: 'Certification', href: adminPath('/certifications') },
  ] },
  { group: 'Content', items: [
    { label: 'Manage Blog', href: adminPath('/blogs') },
    { label: 'Manage Testimonial', href: adminPath('/testimonials') },
  ] },
  { group: 'Inquiries', items: [
    { label: 'Contact Inquiries', href: adminPath('/contact-inquiries') },
    { label: 'Project Inquiries', href: adminPath('/project-inquiries') },
  ] },
  { group: 'Career', items: [
    { label: 'Manage Career', href: adminPath('/careers') },
    { label: 'List of Applied Jobs', href: adminPath('/job-applications') },
  ] },
  { group: 'Settings', items: [
    { label: 'SEO Setup', href: adminPath('/seo') },
    { label: 'Change Password', href: adminPath('/change-password') },
  ] },
];
