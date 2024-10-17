// import Form from '@/app/ui/invoices/edit-form';
import Form from '@/app/invoices/edit-form'
import Breadcrumbs from '@/app/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

// This is the place where we could use the function which is handling '404 Errors' 
// because the user might potentially look for the invoice (based on its id) which does not 
// exist (since id does not exist)
export default async function Page({params}: {params: {id: string}}) {
  const id = params.id
  console.log('id from page is: ' + id)
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id), 
    fetchCustomers()
  ])

  if(!invoice) {
    notFound()
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}