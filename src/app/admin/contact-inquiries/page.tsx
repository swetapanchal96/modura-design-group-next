'use client';

import InquiryList from '@/components/admin/InquiryList';

export default function ContactInquiriesPage() {
  return (
    <InquiryList
      title="Contact Inquiries"
      endpoint="/admin/contact-inquiries"
      excelName="contact-inquiries.xlsx"
      showMailStatus
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'companyName', label: 'Company Name' },
        { key: 'phone', label: 'Phone' },
        { key: 'natureOfProject', label: 'Nature of Project' },
      ]}
      details={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'companyName', label: 'Company Name' },
        { key: 'phone', label: 'Phone' },
        { key: 'natureOfProject', label: 'Nature of Project' },
        { key: 'projectDetails', label: 'Project Details', multiline: true },
      ]}
    />
  );
}
