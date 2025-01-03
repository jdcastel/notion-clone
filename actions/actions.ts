"use server";

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";
import { create } from "domain";
import { documentId } from "firebase/firestore";

export async function createNewDocument() {
    //protect the route and send the user to the login page if they are not authenticated
    auth.protect();

    const {sessionClaims}= await auth();

    const docColletionRef = adminDb.collection('documents');
    const docRef = await docColletionRef.add({
        title: "New Doc"
    });

    await adminDb.collection('users').doc(sessionClaims?.email!).collection('rooms').doc(docRef.id).set({
        userId: sessionClaims?.email!,
        role: 'owner',
        createdAt: new Date(),
        roomId: docRef.id,
    });

    return {docId: docRef.id};
}