import { useState, memo } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const Contact = memo(({ name, phone, email }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{email}</td>
    </tr>
  );
});

export const Form = () => {
  const [contacts, setContacts] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      id: uuidv4(),
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setContacts((prev) => [...prev, data]);
    reset();
  };

  return (
    <>
      <div>
        <h1>Add contact</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Enter your full name:</label>
            <br />
            <input type="text" {...register("name", { required: true })} />
            {errors.name && <div style={{ color: "red" }}>Enter your name</div>}
          </div>
          <br />
          <div>
            <label htmlFor="name">Enter your email:</label>
            <br />
            <input
              type="email"
              {...register(
                "email",
                { required: true },
                {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "invalid email address",
                  },
                }
              )}
            />
            {errors.name && (
              <div style={{ color: "red" }}>Enter your email</div>
            )}
          </div>
          <div>
            <label htmlFor="name">Enter your mobile number:</label>
            <br />
            <input type="number" {...register("phone", { maxLength: 12 })} />
            {errors.phone && (
              <div style={{ color: "red" }}>Enter your number</div>
            )}
          </div>
          <input type="submit" />
        </form>
      </div>
      {contacts.map((contact) => (
        <Contact {...contact} key={contact.id} />
      ))}
    </>
  );
};
