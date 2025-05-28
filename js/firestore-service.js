// Firestore Service - handles database operations
import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp,
  serverTimestamp
} from "firebase/firestore";
import { getApp } from "firebase/app";

// Get Firestore instance
const db = getFirestore(getApp());

// Collection names
const COLLECTIONS = {
  CLIENTS: 'clients',
  MEASUREMENTS: 'measurements',
  ESTIMATES: 'estimates'
};

// Client service
const clientService = {
  // Get all clients
  async getAllClients() {
    try {
      const clientsRef = collection(db, COLLECTIONS.CLIENTS);
      const q = query(clientsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting clients:", error);
      throw error;
    }
  },
  
  // Get client by ID
  async getClientById(clientId) {
    try {
      const docRef = doc(db, COLLECTIONS.CLIENTS, clientId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      } else {
        throw new Error("Client not found");
      }
    } catch (error) {
      console.error("Error getting client:", error);
      throw error;
    }
  },
  
  // Add new client
  async addClient(clientData) {
    try {
      // Add creation timestamp
      const dataWithTimestamp = {
        ...clientData,
        createdAt: serverTimestamp(),
        status: clientData.status || 'Новый лид'
      };
      
      const docRef = await addDoc(collection(db, COLLECTIONS.CLIENTS), dataWithTimestamp);
      return {
        id: docRef.id,
        ...clientData
      };
    } catch (error) {
      console.error("Error adding client:", error);
      throw error;
    }
  },
  
  // Update client
  async updateClient(clientId, clientData) {
    try {
      const clientRef = doc(db, COLLECTIONS.CLIENTS, clientId);
      
      // Add update timestamp
      const dataWithTimestamp = {
        ...clientData,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(clientRef, dataWithTimestamp);
      return {
        id: clientId,
        ...clientData
      };
    } catch (error) {
      console.error("Error updating client:", error);
      throw error;
    }
  },
  
  // Delete client
  async deleteClient(clientId) {
    try {
      await deleteDoc(doc(db, COLLECTIONS.CLIENTS, clientId));
      return true;
    } catch (error) {
      console.error("Error deleting client:", error);
      throw error;
    }
  },
  
  // Filter clients by status
  async getClientsByStatus(status) {
    try {
      const clientsRef = collection(db, COLLECTIONS.CLIENTS);
      const q = query(
        clientsRef, 
        where("status", "==", status),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error filtering clients:", error);
      throw error;
    }
  }
};

// Measurements service
const measurementService = {
  // Get measurements for a client
  async getMeasurementsByClientId(clientId) {
    try {
      const measurementsRef = collection(db, COLLECTIONS.CLIENTS, clientId, COLLECTIONS.MEASUREMENTS);
      const querySnapshot = await getDocs(measurementsRef);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting measurements:", error);
      throw error;
    }
  },
  
  // Add measurement to client
  async addMeasurement(clientId, measurementData) {
    try {
      const dataWithTimestamp = {
        ...measurementData,
        createdAt: serverTimestamp()
      };
      
      const measurementsRef = collection(db, COLLECTIONS.CLIENTS, clientId, COLLECTIONS.MEASUREMENTS);
      const docRef = await addDoc(measurementsRef, dataWithTimestamp);
      
      return {
        id: docRef.id,
        ...measurementData
      };
    } catch (error) {
      console.error("Error adding measurement:", error);
      throw error;
    }
  }
};

// Estimates service
const estimateService = {
  // Get estimates for a client
  async getEstimatesByClientId(clientId) {
    try {
      const estimatesRef = collection(db, COLLECTIONS.CLIENTS, clientId, COLLECTIONS.ESTIMATES);
      const querySnapshot = await getDocs(estimatesRef);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error getting estimates:", error);
      throw error;
    }
  },
  
  // Add estimate to client
  async addEstimate(clientId, estimateData) {
    try {
      const dataWithTimestamp = {
        ...estimateData,
        createdAt: serverTimestamp()
      };
      
      const estimatesRef = collection(db, COLLECTIONS.CLIENTS, clientId, COLLECTIONS.ESTIMATES);
      const docRef = await addDoc(estimatesRef, dataWithTimestamp);
      
      return {
        id: docRef.id,
        ...estimateData
      };
    } catch (error) {
      console.error("Error adding estimate:", error);
      throw error;
    }
  }
};

export {
  clientService,
  measurementService,
  estimateService
}; 