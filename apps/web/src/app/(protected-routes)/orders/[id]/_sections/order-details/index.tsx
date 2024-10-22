import { OrderDto } from "@saeki/schema";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function OrderDetailsSection(props: { order: OrderDto }) {
  return (
    <section
      id="order-details-section"
      className="flex w-full max-w-[1200px] flex-col gap-4"
    >
      <h2 className="text-xl font-bold tracking-tight">Details</h2>
      <div className="w-full p-4 border rounded-lg">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row align-top gap-4">
            <InputField
              id="first-name"
              label="First Name"
              placeholder="John"
              required
              value={props.order.firstName}
              readOnly
            />
            <InputField
              id="last-name"
              label="Last Name"
              placeholder="Doe"
              required
              value={props.order.lastName}
              readOnly
            />
          </div>
          <InputField
            id="company"
            label="Company"
            placeholder="Company"
            required
            value={props.order.company}
            readOnly
          />
          <div className="flex flex-row align-top gap-4">
            <InputField
              id="phone"
              label="Phone Number"
              placeholder="+1 123 456 7890"
              required
              value={props.order.phone}
              readOnly
            />
            <InputField
              id="email"
              label="Email"
              placeholder="person@example.com"
              required
              value={props.order.email}
              readOnly
            />
          </div>
          <InputField
            id="address-1"
            label="Address"
            placeholder="Address line 1"
            required
            value={props.order.address1}
            readOnly
          />
          <InputField
            id="address-2"
            placeholder="Address line 2"
            required
            value={props.order.address2 ?? "-"}
            readOnly
          />
          <div className="flex flex-row align-top gap-4">
            <InputField
              id="city"
              label="City"
              placeholder="City"
              required
              value={props.order.city}
              readOnly
            />
            <InputField
              id="region"
              label="Region"
              placeholder="Region"
              required
              value={props.order.region}
              readOnly
            />
          </div>
          <div className="flex flex-row align-top gap-4">
            <InputField
              id="zip"
              label="Postal / Zip Code"
              placeholder="123456"
              required
              value={props.order.zip}
              readOnly
            />
            <InputField
              id="country"
              label="Country"
              placeholder="Switzerland"
              required
              value={props.order.country}
              readOnly
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
          value={props.order.cardNumber}
          readOnly
        />
        <InputField
          id="name-on-card"
          label="Name On Card"
          placeholder="John Doe"
          required
          value={props.order.nameOnCard}
          readOnly
        />
        <div className="flex flex-row align-top gap-4">
          <InputField
            id="expiry-date"
            label="Expiry Date"
            placeholder="01/28"
            required
            value={props.order.expiryDate}
            readOnly
          />
          <InputField
            id="cvc"
            label="Security Code"
            placeholder="123"
            required
            value={props.order.cvc}
            readOnly
          />
        </div>
      </div>
    </section>
  );
}

type InputFieldDynamicityProps =
  | {
      readOnly?: false;
      onChange: (value: string) => void;
    }
  | {
      readOnly: true;
    };
type InputFieldProps = {
  id: string;
  label?: string;
  placeholder: string;
  required?: boolean;
  value: string;
} & InputFieldDynamicityProps;

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
        readOnly={props.readOnly}
        onChange={(ev) => {
          if (!props.readOnly) {
            props.onChange(ev.target.value);
          }
        }}
      />
    </div>
  );
}
