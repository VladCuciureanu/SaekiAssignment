"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrder } from "@/lib/orders";

export function OrderFormSection(props: { projectId: string }) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [city, setCity] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [nameOnCard, setNameOnCard] = React.useState("");
  const [expiryDate, setExpiryDate] = React.useState("");
  const [cvc, setCvc] = React.useState("");

  const router = useRouter();

  function handleSubmit() {
    createOrder({
      firstName,
      lastName,
      company,
      phone,
      email,
      address1,
      address2,
      city,
      region,
      zip,
      country,
      cardNumber,
      nameOnCard,
      expiryDate,
      cvc,
      projectId: props.projectId,
    }).then((res) => {
      router.push(`/orders/${res.id}`);
    });
  }

  const canSubmit =
    firstName &&
    lastName &&
    company &&
    phone &&
    email &&
    address1 &&
    city &&
    region &&
    zip &&
    country &&
    cardNumber &&
    nameOnCard &&
    expiryDate &&
    cvc;

  return (
    <section
      id="order-form-section"
      className="flex w-full max-w-[1200px] flex-col gap-4"
    >
      <h2 className="text-xl font-bold tracking-tight">Order</h2>
      <div className="w-full p-4 border rounded-lg">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row align-top gap-4">
            <InputField
              id="first-name"
              label="First Name"
              placeholder="John"
              required
              value={firstName}
              onChange={setFirstName}
            />
            <InputField
              id="last-name"
              label="Last Name"
              placeholder="Doe"
              required
              value={lastName}
              onChange={setLastName}
            />
          </div>
          <InputField
            id="company"
            label="Company"
            placeholder="Company"
            required
            value={company}
            onChange={setCompany}
          />
          <div className="flex flex-row align-top gap-4">
            <InputField
              id="phone"
              label="Phone Number"
              placeholder="+1 123 456 7890"
              required
              value={phone}
              onChange={setPhone}
            />
            <InputField
              id="email"
              label="Email"
              placeholder="person@example.com"
              required
              value={email}
              onChange={setEmail}
            />
          </div>
          <InputField
            id="address-1"
            label="Address"
            placeholder="Address line 1"
            required
            value={address1}
            onChange={setAddress1}
          />
          <InputField
            id="address-2"
            placeholder="Address line 2"
            required
            value={address2}
            onChange={setAddress2}
          />
          <div className="flex flex-row align-top gap-4">
            <InputField
              id="city"
              label="City"
              placeholder="City"
              required
              value={city}
              onChange={setCity}
            />
            <InputField
              id="region"
              label="Region"
              placeholder="Region"
              required
              value={region}
              onChange={setRegion}
            />
          </div>
          <div className="flex flex-row align-top gap-4">
            <InputField
              id="zip"
              label="Postal / Zip Code"
              placeholder="123456"
              required
              value={zip}
              onChange={setZip}
            />
            <InputField
              id="country"
              label="Country"
              placeholder="Switzerland"
              required
              value={country}
              onChange={setCountry}
            />
          </div>
        </div>
      </div>
      <div className="w-full p-4 border rounded-lg flex flex-col gap-4">
        <InputField
          id="card-number"
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          required
          value={cardNumber}
          onChange={setCardNumber}
        />
        <InputField
          id="name-on-card"
          label="Name On Card"
          placeholder="John Doe"
          required
          value={nameOnCard}
          onChange={setNameOnCard}
        />
        <div className="flex flex-row align-top gap-4">
          <InputField
            id="expiry-date"
            label="Expiry Date"
            placeholder="01/28"
            required
            value={expiryDate}
            onChange={setExpiryDate}
          />
          <InputField
            id="cvc"
            label="Security Code"
            placeholder="123"
            required
            value={cvc}
            onChange={setCvc}
          />
        </div>
      </div>
      <Button disabled={!canSubmit} onClick={handleSubmit}>
        Order
      </Button>
    </section>
  );
}

type InputFieldProps = {
  id: string;
  label?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
};

function InputField(props: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {props.label && (
        <Label htmlFor="input-first-name" className="flex flex-row">
          {props.label}
          {props.required && <b className="font-bold ml-0.5 text-red-400">*</b>}
        </Label>
      )}
      <Input
        type="text"
        id={`input-${props.id}`}
        name={`input-${props.id}`}
        placeholder={props.placeholder}
        className="w-full"
        value={props.value}
        onChange={(ev) => props.onChange(ev.target.value)}
      />
    </div>
  );
}
