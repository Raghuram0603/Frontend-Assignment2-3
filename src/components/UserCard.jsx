import React from 'react';

const UserCard = ({ user, onEdit, onDelete, isDeleting }) => {

  const formatPhone = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    
    return phone; 
  };

  const formatWebsite = (website) => {
    if (!website) return '';
    
    return website.replace(/^https?:\/\//, '');
  };

  const handleWebsiteClick = (website) => {
    if (!website) return;
    
    const url = website.startsWith('http') ? website : `https://${website}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="user-card">
      <div className="user-card-header">
        <div className="user-info">
          <h3>{user.name}</h3>
          <p>@{user.username}</p>
        </div>
      </div>

      <div className="user-details">
        <div className="user-detail-item">
          <div style={{display:"flex"}}>
            <p><strong>Email : </strong></p>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="user-detail-item">
          <div style={{display:"flex"}}>
            <p><strong>Phone : </strong></p>
            <p>{user.phone}</p>
          </div>
        </div>

        {user.website && (
          <div className="user-detail-item">
            <div style={{display:"flex"}}>
              <p><strong>Website : </strong></p>
              <p>{user.website}</p>
            </div>
          </div>
        )}

        {user.company && (
          <div className="user-detail-item">
          <div style={{display:"flex"}} >
            <p><strong>Company : </strong></p>
            <span>{user.company}</span>
          </div>
          </div>
        )}

        <div className="user-detail-item">
          <div style={{ display: "flex", flexDirection: "column",gap:"7px"}}>
            <div style={{ display: "flex" }}>
              <p><strong>Street: </strong></p>
              <p>{user.street}</p>
            </div>
            <div style={{ display: "flex" }}>
              <p><strong>City: </strong></p>
              <p>{user.city}</p>
            </div>
            <div style={{ display: "flex" }}>
              <p><strong>Zipcode: </strong></p>
              <p>{user.zipcode}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="user-actions">
        <button
          className="btn btn-primary"
          onClick={() => onEdit(user)}
          disabled={isDeleting}
          title="Edit user"
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onDelete(user.id)}
          disabled={isDeleting}
          title="Delete user"
        >
          {isDeleting ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Deleting...
            </>
          ) : (
            <>
              Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default UserCard;