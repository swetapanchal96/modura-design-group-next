 'use client';
 
import InquiryList from '@/components/admin/InquiryList';
 
export default function GetInTouchInquiriesPage() {
  return (
    <InquiryList
      title="Get in Touch Inquiries"
      endpoint="/admin/get-in-touch-inquiries"
      excelName="get-in-touch-inquiries.xlsx"
      showMailStatus={false}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'service', label: 'Service' },
      ]}
      details={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'service', label: 'Service' },
        { key: 'description', label: 'Description', multiline: true },
      ]}
    />
  );
}
 
