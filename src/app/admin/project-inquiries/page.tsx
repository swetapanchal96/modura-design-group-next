'use client';

import InquiryList from '@/components/admin/InquiryList';

export default function ProjectInquiriesPage() {
  return (
    <InquiryList
      title="Project Inquiries"
      endpoint="/admin/project-inquiries"
      excelName="project-inquiries.xlsx"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'company', label: 'Company' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'country', label: 'Country' },
        { key: 'natureOfProject', label: 'Nature of Project' },
      ]}
      details={[
        { key: 'name', label: 'Name' },
        { key: 'company', label: 'Company' },
        { key: 'email', label: 'Email Address' },
        { key: 'phone', label: 'Phone' },
        { key: 'city', label: 'City' },
        { key: 'state', label: 'State' },
        { key: 'country', label: 'Country' },
        { key: 'natureOfProject', label: 'Nature of Project' },
        { key: 'description', label: 'Description of your project', multiline: true },
        { key: 'teams', label: 'Teams' },
        { key: 'hangout', label: 'Hangout' },
        { key: 'other', label: 'Other' },
      ]}
    />
  );
}
