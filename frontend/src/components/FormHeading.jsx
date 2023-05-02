/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

// assets 
import logo from '../assets/images/favicon.png'

export default function FormHeading({heading, caption, linkDirection, linkText}) {
  return (
    <div className="mb-10 font-rubik text-neutral-grayish-blue">
        <div className="flex justify-center">
          <img 
            alt=""
            className="h-14 w-14"
            src={logo}
            />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {heading}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {caption}
          <Link to={linkDirection} className="ml-1 font-medium text-primary-moderate-blue hover:text-primary-light-grayish-blue ">
            {linkText}
          </Link>
        </p>
      </div>
  )
}
