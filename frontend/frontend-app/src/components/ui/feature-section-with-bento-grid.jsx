import React from "react";
import { User, FilePlus2, Boxes, Truck } from "lucide-react";
import {Link} from "react-router-dom";

function Feature() {
  return (
    <div className="w-full pt-6 pb-20 lg:pt-12 lg:pb-32">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left text-[#132C48]">
                Admin Portal
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                Managing day to day business easily and efficiently.
              </p>
            </div>
          </div>
   
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to='/admin/users' className="block h-full lg:col-span-2">
              <div className="rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col bg-gradient-to-br from-[#3e5872] via-[#1f3b5a] via-[#1A2F4A] to-[#132C48] shadow-md group">
                <User className="w-8 h-8 stroke-1 text-white transform transition-transform duration-300 group-hover:scale-125" />
                <div className="flex flex-col transform transition-transform duration-300 group-hover:scale-[1.02]">
                  <h3 className="text-xl tracking-tight text-white">
                    User Management
                  </h3>
                  <p className="text-gray-300 max-w-lg text-base">
                    View and manage all registered users, monitor account activity, and access comprehensive user profiles.  
                  </p>
                </div>
              </div>
            </Link>
            
            <Link to='/admin/addproduct'>
              <div className="rounded-md aspect-square p-6 flex justify-between flex-col bg-gradient-to-br from-[#3e5872] via-[#1f3b5a] via-[#1A2F4A] to-[#132C48] shadow-md group">
              <FilePlus2 className="w-8 h-8 stroke-1 text-white transform transition-transform duration-300 group-hover:scale-125" />
                <div className="flex flex-col transform transition-transform duration-300 group-hover:scale-[1.02]">
                  <h3 className="text-xl tracking-tight text-white">Add New Product</h3>
                  <p className="text-gray-300 max-w-md text-base">
                    Seamlessly add new products to your inventory with detailed specifications and availability status.
                  </p>
                </div>
              </div>
            </Link>

            <Link to='/admin/products'>
              <div className="rounded-md aspect-square p-6 flex justify-between flex-col bg-gradient-to-br from-[#eea67c] via-[#c0724b] via-[#E26D42] to-[#c25729] shadow-md group">
                <Boxes className="w-8 h-8 stroke-1 text-white transform transition-transform duration-300 group-hover:scale-125" />
                <div className="flex flex-col transform transition-transform duration-300 group-hover:scale-[1.02]">
                  <h3 className="text-xl tracking-tight text-white">View Product Catalog</h3>
                  <p className="text-orange-100 max-w-xs text-base">
                    Browse and manage all listed products, including stock levels, pricing, and descriptions.
                  </p>
                </div>
              </div>
            </Link>

            <Link to='/admin/orders' className="block h-full lg:col-span-2">
              <div className="rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col bg-gradient-to-br from-[#3e5872] via-[#1f3b5a] via-[#1A2F4A] to-[#132C48] shadow-lg group">
                  <Truck className="w-8 h-8 stroke-1 text-white transform transition-transform duration-300 group-hover:scale-125" />
                <div className="flex flex-col transform transition-transform duration-300 group-hover:scale-[1.02]">
                  <h3 className="text-xl tracking-tight text-white">Manage Orders</h3>
                  <p className="text-gray-200 max-w-xs text-base">
                    Track and oversee customer orders, update statuses, and ensure timely delivery of products.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature };
