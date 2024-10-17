"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormData = z.object({
   id: z.string(), 
   customerId: z.string(), 
   amount: z.coerce.number(), 
   status: z.enum(['pending', 'paid']), 
   date: z.string()
})


const CustomerData = FormData.omit({id: true, date: true})

const UpdateInvoice = FormData.omit({id: true, date: true})

export async function createInvoice(formData: FormData) {  
   const {customerId, amount, status} = CustomerData.parse({
      customerId: formData.get('customerId'), 
      amount: formData.get('amount'), 
      status: formData.get('status'), 
   })

   const amountInCents = amount * 100
   const date = new Date().toISOString().split('T')[0]

   try {
      await sql`
         INSERT INTO invoices (customer_id, amount, status, date)
         VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
   }
   catch(error) {
      console.error(error)
      throw new Error('There was an error when creating the invoice.') 
   }

   revalidatePath('/dashboard/invoices')  // this will clear the cache and update the info dynamically on the specified path
   redirect('/dashboard/invoices')  // this will send the user to the specified path
} 

export async function updateInvoice(id: string, formData: FormData) {
   const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
   });

   const amountInCents = amount * 100;

   try {
      await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
      `;
   }
   catch(error) {
      console.error(error)
      throw new Error('There was an error when updating the invoice.') 
   }

   revalidatePath('/dashboard/invoices');
   redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
   try {
      await sql`
      DELETE FROM invoices
      WHERE id = ${id}
      `;
      revalidatePath('/dashboard/invoices');
   }
   catch(error) {
      console.error(error)
      throw new Error('There was an error when deleting the invoice.') 
   }
   // redirect()     since we are already in the 'dashboard' page, we dont need to call this function
}