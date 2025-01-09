"use client";

import { MenuIcon } from "lucide-react"
import NewDocumentButton from "./NewDocumentButton"
import { useCollection } from "react-firebase-hooks/firestore"
import { query, where, collection, DocumentData, collectionGroup } from "firebase/firestore";
import { useUser } from "@clerk/nextjs"
import {db} from '@/firebase';
import { useEffect, useState } from "react";
import { Root } from "postcss";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import SidebarOptions from "./SidebarOptions";
  
  interface RoomDocument extends DocumentData {
    createdAt: string;
    role: "owner" | "editor";
    roomId: string;
    userId: string;
  }

function Sidebar() {

const {user} = useUser();

const [groupedData, setGroupData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
}>({
    owner: [],
    editor: [],
});

const [data, loading, error ] = useCollection(
    user && (
        query(collectionGroup(db, "rooms"), 
        where("userId", "==", user.emailAddresses[0].toString()))
    )
);

    useEffect(() => {
    if(!data) return;

    const grouped = data.docs.reduce<{
        owner: RoomDocument[];
        editor: RoomDocument[];
    }>(
        (acc, curr) => {
            const roomData = curr.data() as RoomDocument;
           
        // Include the document ID *before* spreading the data
        if (roomData.role === "owner") {
            acc.owner.push({ id: curr.id, ...roomData });
          } else {
            acc.editor.push({ id: curr.id, ...roomData });
          }
  
          return acc;
        },
        { owner: [], editor: [] }
      );

    setGroupData(grouped);
    }, [data]);

    const menuOptions = (
        <>
            <NewDocumentButton />

            <div className="flex py-4 flex-col  space-y-4 md:max-w-36">
                
                {/* MyDocuments */}
                {groupedData.owner.length === 0 ? (
                    <h2 className="text-gray-500 font-semibold text-sm ">
                        No documents found
                    </h2>
                ) : (
                <>
                    <h2 className="text-gray-500 font-semibold text-sm ">
                        My Documents
                    </h2>
                    {groupedData.owner.map((doc) => (
                         <SidebarOptions key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                    ))}
                </>
                )}
            </div>

            {/* Shared with me */}

            {groupedData.editor.length > 0 && (
              <>
                    <h2 className="text-gray-500 font-semibold text-sm ">
                        Shared with me 
                    </h2>
              {groupedData.editor.map((doc) => (
                      <SidebarOptions key={doc.id} id={doc.id} href={`/doc/${doc.id}
                      `} />
                ))}  
            </>
            )}
        {/* List */}
        </>  
  );

  return (
    <div className="p-2 md:p-5 relative bg-gray-200">
        <div className="md:hidden">
            <Sheet >
            <SheetTrigger>
                <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40}/>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white">
                <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                    {menuOptions}
                </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>    
        
        <div className="hidden md:inline">
            {menuOptions}
        </div>
    </div>
  )
}
export default Sidebar