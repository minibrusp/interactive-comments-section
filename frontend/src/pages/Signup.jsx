
import FormHeading from "../components/FormHeading";
import SignupForm from "../components/SignupForm";

export default function Signup() {


  return (
    <section className="mx-4">

      <div className="bg-neutral-white px-4 py-8 max-w-[733px] mx-auto shadow-md rounded-md">
        <FormHeading 
          heading="Signup to create an account"
          caption="Already have an account?"
          linkDirection="/login"
          linkText="Login"
        />

        <SignupForm />
      </div>

    </section>
  )
}
