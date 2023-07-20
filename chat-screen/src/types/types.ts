export interface chatMessage {
  id: number;
  sender: {
    image: string;
    is_kyc_verified: boolean;
    self: boolean;
    user_id: string;
  };
  message: string;
  time: string;
}

export interface apiData {
  from: string;
  message: string;
  name: string;
  status: string;
  to: string;
}
