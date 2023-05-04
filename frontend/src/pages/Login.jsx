import FormHeading from "../components/FormHeading"
import LoginForm from "../components/LoginForm"

export default function Login() {
  return (
    <section className="mx-4">
      <div className="bg-neutral-white px-4 py-8 max-w-[733px] mx-auto shadow-md rounded-md">
        <FormHeading 
          heading="Login to your account"
          caption="Don't have an account yet? "
          linkDirection="/signup"
          linkText="Signup"
        />

        <LoginForm />
      </div>
    </section>
  )
}
