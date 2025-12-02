import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export function AdminDashboard() {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'adoptionRequests'));
      setAdoptionRequests(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchAdoptionRequests();
  }, []);

  const updateRequestStatus = async (requestId, newStatus) => {
    const db = getFirestore();
    await updateDoc(doc(db, 'adoptionRequests', requestId), { status: newStatus });
    setAdoptionRequests(adoptionRequests.map(request =>
      request.id === requestId ? { ...request, status: newStatus } : request
    ));
    setSelectedRequest(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">Adoption Requests Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {adoptionRequests.map(request => (
            <div key={request.id} className="bg-white overflow-hidden shadow-sm rounded-lg transition-all duration-300 hover:shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">{request.petName}</h2>
                <p className="text-sm text-gray-600">User ID: {request.userId}</p>
              </div>
              <div className="px-6 py-4">
                <p className="text-sm font-medium text-gray-700">
                  Status:
                  <span className={`ml-2 inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </p>
              </div>
              <div className="px-6 py-4 bg-gray-50 flex justify-between">
                <button
                  onClick={() => setSelectedRequest(request)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Details
                </button>
                <div>
                  <button
                    onClick={() => updateRequestStatus(request.id, 'approved')}
                    className="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateRequestStatus(request.id, 'rejected')}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setSelectedRequest(null)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedRequest.petName} Details</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  User ID: {selectedRequest.userId}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Status: {selectedRequest.status}
                </p>
               
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}