import { OrderStatus } from "../enums/order-status.enum";

export class OrderDto {
  id: string;
  status: OrderStatus;
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  email: string;
  address1: string;
  address2?: string;
  city: string;
  region: string;
  zip: string;
  country: string;
  cardNumber: string;
  nameOnCard: string;
  expiryDate: string;
  cvc: string;
  clientId: string;
  createdAt: Date;

  constructor(props: {
    id: string;
    status: OrderStatus;
    firstName: string;
    lastName: string;
    company: string;
    phone: string;
    email: string;
    address1: string;
    address2?: string;
    city: string;
    region: string;
    zip: string;
    country: string;
    cardNumber: string;
    nameOnCard: string;
    expiryDate: string;
    cvc: string;
    clientId: string;
    createdAt: Date;
  }) {
    this.id = props.id;
    this.status = props.status;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.company = props.company;
    this.phone = props.phone;
    this.email = props.email;
    this.address1 = props.address1;
    this.address2 = props.address2;
    this.city = props.city;
    this.region = props.region;
    this.zip = props.zip;
    this.country = props.country;
    this.cardNumber = props.cardNumber;
    this.nameOnCard = props.nameOnCard;
    this.expiryDate = props.expiryDate;
    this.cvc = props.cvc;
    this.clientId = props.clientId;
    this.createdAt = props.createdAt;
  }
}
