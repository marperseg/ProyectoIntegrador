// Interfaces

export interface Country {
  value: string;
  cities?: City[];
}

export interface City {
  value: string;
}

// New user data
export interface NewUser {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  confPassword: string;
  country: string;
  city: string;
}

export interface UserCreated {
  userName: string;
  fullName: string;
  userId: string;
  checked: boolean;
  repeted: boolean;
}

// Message
export interface outboxMessage {
  msgId: number;
  from: string;
  to: string;
  date: string;
  body: string;
}

//New Message sent confimration
export interface newMsgeConfirm {
  checked: boolean;
  answer: string;
}

//User for log in
export interface User {
  UserName: string;
  Password: string;
}

// Already logged in user
export interface userLoggedIn {
  name: string;
  id: string;
  checked: boolean;
  logged: boolean;
}

// Inbox Message
export interface inMessage {
  msgId: number;
  from: string;
  fromName: string;
  to: string;
  date: string;
  body: string;
  read: boolean;
}

// New Message to multiple recievers
export interface outMessage {
  from: string;
  to: string[];
  toNames: string[];
  date: string;
  body: string;
}

//New Message sent confimration
export interface newMsgeConfirm {
  checked: boolean;
  answer: string;
}

// Object for delete message data
export interface deleteData {
  id: number;
  box: string;
}

// Object for mark message as read
export interface markAsReadData {
  msgId: number;
  mark: boolean;
}
