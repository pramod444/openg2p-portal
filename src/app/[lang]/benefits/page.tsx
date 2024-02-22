'use client'
import React from 'react';
import Link from 'next/link'
import { fetchBenefitDetails } from '@utils'
import Loading from '../loading';
import { Locale } from '@i18n.config'
import { getDictionary } from '@lib/dictionary'
import { Suspense } from 'react';
import { Pagination, SearchBar } from '../components';
import { AuthUtil } from '../components/auth';
import { useState ,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { BenefitDetails } from '@types';
export default async function BenefPage({ searchParams, params: { lang } }: {
  searchParams?: {
    query?: string;
    page?: string;
  },
  params: { lang: Locale }
}) {

  // const [sortKey, setSortKey] = useState<SortKeys>("id");
  // const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");
  // type SortKeys = keyof Program;
  // type SortOrder = "ascn" | "desc";

  // function sortData({
  //   tableData,
  //   sortKey,
  //   reverse,
  // }: {
  //   tableData: Program[];
  //   sortKey: SortKeys;
  //   reverse: boolean;
  // }) {
  //   if (!sortKey) return tableData;

  //   const sortedData = programs.sort((a, b) => {
  //     return a[sortKey] > b[sortKey] ? 1 : -1;
  //   });

  //   if (reverse) {
  //     return sortedData.reverse();
  //   }

  //   return sortedData;
  // }
  // const sortedData = () => sortData({ tableData: programs, sortKey, reverse: sortOrder === "desc" });

  const router = useRouter();
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const benefits = await fetchBenefitDetails({
    benefit: query || "",
    currentPage: currentPage,

  });



  const handleApplyClick = (benefit: BenefitDetails) => {
    router.push(`apply?ern=${benefit.entitlement_reference_number}`);
  };
  const handleViewClick = (benefit: BenefitDetails) => {
    router.push(`submission?ERN=${benefit.entitlement_reference_number}`);

  };

  const isDataEmpty = !Array.isArray(benefits) || benefits.length < 1 || !benefits

  const dictionary = await getDictionary(lang);
  if (!dictionary) {
    return;
  }
  const { page } = dictionary;


  // useEffect(() => {
  //   const fetchData = async () => {


  //     const storedFormState = localStorage.getItem('formState');
  //     if (storedFormState === 'true') {
  //       setFormState(true);
  //     }
  //   };

  //   fetchData();

  // }, );
  // function SortButton({
  //   sortOrder,
  //   columnKey,
  //   sortKey,
  //   onClick,
  // }: {
  //   sortOrder: SortOrder;
  //   columnKey: SortKeys;
  //   sortKey: SortKeys;
  //   onClick: MouseEventHandler<HTMLButtonElement>;
  // }) {
  //   return (
  //     <button
  //       onClick={onClick}
  //       className={`${sortKey === columnKey && sortOrder === "desc"
  //         ? "w-3 h-3 ml-1.5  text-gray-400"
  //         : "w-3 h-3 ml-1.5  text-gray-400"
  //         }`}
  //     >
  //       <svg
  //         className="w-3 h-3 ml-1.5  text-gray-400"
  //         aria-hidden="true"
  //         xmlns="http://www.w3.org/2000/svg"
  //         fill="currentColor"
  //         viewBox="0 0 24 24"
  //       >
  //         <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
  //       </svg>
  //     </button>
  //   );
  // }

  // const headers: { key: SortKeys; label: string }[] = [
  //   { key: "id", label: "ID" },
  //   { key: "program_name", label: "Program Name" },
  //   { key: "program_status", label: "Program Status" },
  //   { key: "application_status", label: " Application Status" },
  // ];

  // function changeSort(key: SortKeys) {
  //   setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

  //   setSortKey(key);
  // }
//   return (
//     <div className=" rounded-lg border-gray-200 p-4 mx-4 lg:px-4 m-0 mt-2">
//       <AuthUtil failedRedirectUrl='/en/login' />
//       <div className='mx-auto max-w-screen-xl'>
//         <div className='max-w-screen-xl text-gray-700 text-xl '>All Applications</div>
//         <div className='flex flex-wrap gap-2 mt-6 items-center '>
//           <Link href={`/${lang}/home`} className="flex items-center no-underline text-blue-900"> Home </Link>
//           <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
//           <p className='m-0'>All Applications</p>
//         </div>
//       </div>
//       {!isDataEmpty ? (
//         <div className=" m-6 p-4 md:space-x-8 mx-auto max-w-screen-xl flex justify-center items-center">
//           <div className=" bg-brand container w-1180 shadow-md rounded-lg top-24">
//             <div className="flex flex-wrap justify-between items-center">
//               <p className="flex items-center text-gray-700 text-x p-2 font-fontcustom m-2 ">{page.application.title}</p>
//               <SearchBar />
//             </div>
//             <Suspense fallback={<Loading />}>
//               <div className="  md:space-x-8 mx-auto max-w-screen-xl flex justify-center items-center relative overflow-x-auto">
//                 <table className="w-full text-sm text-left text-gray-600">
//                   <thead className="text-xs text-gray-600 bg-gray-100">

//                     <tr>
//                       {/* {headers.map((row) => {
//                         return (
//                           <th scope="col" className="px-6 py-3" key={row.key}>
//                             <div className="flex items-center">
//                               {row.label}{" "}
//                               <SortButton
//                                 columnKey={row.key}
//                                 onClick={() => changeSort(row.key)}
//                                 {...{
//                                   sortOrder,
//                                   sortKey,
//                                 }}
//                               />
//                             </div>
//                           </th>
//                         );
//                       })} */}
//                       <th scope="col" className="px-6 py-3">
//                         {page.application.number}
//                       </th>
//                       <th scope="col" className="px-6 py-3">
//                         <div className="flex items-center">
//                           {page.application.program_name}
//                           <a href="#">

//                             <svg
//                               className="w-3 h-3 ml-1.5  text-gray-400"
//                               aria-hidden="true"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
//                             </svg>
//                           </a>
//                         </div>
//                       </th>

//                       <th scope="col" className="px-6 py-3">
//                         <div className="flex items-center">
//                           {page.application.application_id}
//                           <a href="#">
//                             <svg
//                               className="w-3 h-3 ml-1.5 text-gray-400"
//                               aria-hidden="true"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
//                             </svg>
//                           </a>
//                         </div>
//                       </th>
//                       <th scope="col" className="px-6 py-3">
//                         <div className="flex items-center">
//                           {page.application.application_status}
//                           <a href="#">
//                             <svg
//                               className="w-3 h-3 ml-1.5 text-gray-400"
//                               aria-hidden="true"
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
//                             </svg>
//                           </a>
//                         </div>
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {applications.map((application, index) => (
//                       <tr
//                         key={application.application_id}
//                         className="bg-white border-b dark:bg-white-200 dark:border-white-200 text-gray-600"
//                       >
//                         <td className="px-6 py-4">{index + 1}</td>
//                         <td scope="row" className="px-6 py-4 ">
//                           {application.program_name}
//                         </td>
//                         <td className="px-6 py-4">
//                           <button
//                             type="button"
//                             className={`top-14  w-24 h-8 rounded-md text-center tracking-[0px] opacity-100 border-collapse border-[none] left-[811px] ${application.application_status ? 'bg-gray-300 text-gray-600' : 'bg-[#c7ebd1] text-[#075e45]'
//                               }`}
//                             disabled={true}
//                           >
//                             {application.application_status ? 'Enrolled' : 'Not Applied'}
//                           </button>

//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="top-14 left-11">
//                             {application.application_status === 'submitted' ? (
//                               <button
//                                 type="button"
//                                 className="w-24 h-8 bg-white border border-blue-700 rounded-md text-blue-700 text-sm font-normal flex items-center justify-center"
//                                 onClick={() => {
//                                   handleViewClick(application)
//                                 }}
//                               >
//                                 View
//                               </button>
//                             ) : (
//                               <button
//                                 type="button"
//                                 className="w-24 h-8 bg-blue-700 rounded-md text-white text-sm font-normal flex items-center justify-center"
//                                 onClick={() => {
//                                   handleApplyClick(application)
//                                 }}
//                               >
//                                 Apply
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </Suspense>
//             <div className='p-2'>
//               <Pagination />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="mt-16 flex justify-center items-center flex-col gap-2">
//           <h2 className="text-black text-xl font-bold">Oops no results</h2>
//           <p>Message</p>
//         </div>
//       )}

//     </div>

//   )
// }
return (
  <div >
    <AuthUtil failedRedirectUrl='/en/login' />
      {!isDataEmpty ? (
        <div className=" m-6 p-6 md:space-x-4 mx-auto max-w-screen-xl flex justify-center items-center">
          <div className="bg-brand container w-1180 shadow-md  pb-0 rounded-lg top-24">
            <div className="flex flex-wrap justify-between items-center">
              <p className="flex items-center text-gray-700 text-x p-2 font-fontcustom m-2 ">{page.benefit.title}</p>
              <SearchBar />
            </div>
              {/* <div className="flex flex-wrap justify-between items-center">
                <p className="flex items-center text-gray-700 text-x p-2 font-fontcustom m-2 ">{page.application.title}</p>
              <SearchBar />
            </div> */}
            <Suspense fallback={<Loading />}>
              <div className="m-4 md:space-x-8 mx-auto max-w-screen-xl flex justify-center items-center relative overflow-x-auto  ">
                <table className=" w-full  text-sm text-left text-gray-600 ">
                  <thead className="text-xs text-gray-600 bg-gray-100">
                    <tr>
                      <th scope="col" className="px-6 py-3 ">
                        {page.benefit.number}
                      </th>
                      <th scope="col" className="px-6 py-3 ">
                        <div
                          className="flex items-center w-max"
                      >{page.benefit.program_name}
                          <svg data-column="0" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center w-max">
                          {page.benefit.enrollment_status}
                          <svg data-column="1" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center w-max">
                          {page.benefit.entitlement_reference_number}
                          <svg data-column="2" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center w-max">
                          {page.benefit.funds_awaited}
                          <svg data-column="3" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center w-max">
                          {page.benefit.funds_received}
                          <svg data-column="4" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {benefits.map((benefit, index) => (
                      <tr key={index} className="bg-white border-b dark:bg-white-200 dark:border-white-200 text-gray-600">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td scope="row" className="px-6 py-4 ">
                          {benefit.program_name}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            className="h-5 min-w-[84px] rounded text-center tracking-[0px] opacity-100 border-collapse border-[none] left-[811px] bg-[#c7ebd1] text-[#075e45]"
                            disabled={true}
                          >
                            {benefit.enrollment_status}
                          </button>
                        </td>
                        {/* <td className="px-6 py-4">
                          <button
                            type="button"
                            className="h-5 min-w-[84px] rounded text-center tracking-[0px] opacity-100 border-collapse border-[none] left-[811px] bg-[#c7ebd1] text-[#075e45]"
                            disabled={true}
                          >
                            {program.has_applied}
                          </button>
                        </td> */}
                        <td className="px-6 py-4">
                          {benefit.entitlement_reference_number ? benefit.entitlement_reference_number : 'Entitlement not approved'}
                        </td>
                        {/* <td className="px-6 py-4">
                          <span>{program.is_multiple_form_submission}</span>
                        </td> */}
                        <td className="px-6 py-4">
                          {benefit.funds_received}
                        </td>
                        <td className="px-6 py-4">
                          {benefit.funds_awaited}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Suspense>
            {/* <div className='p-2'>
            <Pagination />
          </div> */}
          </div>
        </div>
      ) : (
        <div className='mt-16 flex justify-center items-center flex-col gap-2 '>
          <h2 className='tetx-black text-xl font-bold'>
            Oops no results
          </h2>
          <p>Message</p>
        </div>
      )}
  </div>
);
};