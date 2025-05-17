import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from '@/middleware/AuthContext';
const home = () => {
  const links = [
    { name: 'Open roles', href: '#' },
    { name: 'Internship program', href: '#' },
    { name: 'Our values', href: '#' },
    { name: 'Meet our leadership', href: '#' },
  ]
  const stats = [
    { name: 'Offices worldwide', value: '12' },
    { name: 'Full-time colleagues', value: '300+' },
    { name: 'Hours per week', value: '40' },
    { name: 'Paid time off', value: 'Unlimited' },
  ]
  const jobs = [
    {
      title: "Frontend Developer",
      company: "TechNova",
      location: "Remote",
      type: "Full-Time",
    },
    {
      title: "Backend Engineer",
      company: "CloudSync",
      location: "Bangalore",
      type: "Hybrid",
    },
    {
      title: "UI/UX Designer",
      company: "DesignSpark",
      location: "Delhi",
      type: "Contract",
    },
  ];
  
  const user = useAuth();
  const id = user?.id;
  const name = user?.name;
  const email = user?.email;
  const role = user?.role;
  console.log(name, email, role, id);
  return (
  <>
  
   <div className="relative overflow-hidden">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Best Jobs are finally here Mr {name} {role === "JobSeeker" ? "JobSeeker" : "Recruiter"}!
            </h1>
            <p className="mt-4 text-xl text-white">
              This year, our Prime Jobs  will shelter you from the harsh Financial problems of a world that doesn't care
              if you live or die.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:translate-x-8 lg:-translate-y-1/2">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          alt=""
                          src="https://media.istockphoto.com/id/1349094945/photo/human-using-a-computer-laptop-for-searching-for-job-and-fill-out-personal-data-on-job-website.jpg?s=612x612&w=0&k=20&c=nVCY302pin29eP1rN0eBGstQN3WF4YQTWvZ4TvAs21g="
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://static.vecteezy.com/system/resources/previews/001/871/553/non_2x/promotion-to-find-workers-with-the-words-look-and-find-jobs-concept-ilustration-can-use-for-landing-page-template-ui-web-mobile-poster-banner-flyer-background-website-advertisement-free-vector.jpg"
                          className="size-full object-fill"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCTtJxFhaMgy2qfZrq8V3n63ddNen2caZSqQ&s"
                          className="size-full object-cover"
                          />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://joinsuperset.com/blogs/wp-content/uploads/2023/07/Secret-of-hiring-the-right-person.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUK_v0bAtiCetR0KmwEGu-tTok4vqIwdDv2g&s"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://assets.entrepreneur.com/content/3x2/2000/1637270646-shutterstock-1470208685.jpg"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxVStpFI74owjTB-FY0SPATHpNGdz9F6yfQ&s"
                          className="size-full object-fill"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/jobs"
                className="inline-block rounded-md border border-transparent bg-white px-8 py-3 text-center font-medium text-black hover:bg-white-200"
              >
                Seek Jobs And People For Jobs At Prime Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>







    <div className="relative isolate overflow-hidden bg-gray-900 py-12 sm:py-32">
      <img
        alt="Office background"
        src="https://images.unsplash.com/photo-1596079890740-6b25c1f4d91d?auto=format&fit=crop&w=1500&q=80"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />

      {/* Blurred Gradient Overlays */}
      <div
        aria-hidden="true"
        className="absolute -top-48 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68rem] bg-gradient-to-tr from-pink-500 to-indigo-600 opacity-20"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
            Discover Your Dream Job
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Whether you're looking to hire top talent or find your next opportunity, Prime Jobs connects professionals with the best companies across the globe.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-6 text-base font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-indigo-400 transition">
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse gap-1">
                <dt className="text-base text-gray-300">{stat.name}</dt>
                <dd className="text-4xl font-bold text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  
    <section className="bg-gradient-to-br from-black via-black-50 to-black-100 py-16 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-4xl font-bold text-white mb-10 text-center"
        >
          🚀 Latest Job Openings
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 mb-2">
                {job.title}
              </h3>
              <p className="text-gray-700 font-medium">{job.company}</p>
              <p className="text-sm text-gray-500 mt-1">
                {job.location} • {job.type}
              </p>
              <button className="mt-5 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200">
                View Job
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>





    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg/8 font-semibold text-gray-900">
          Trusted by the world’s most innovative teams
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            alt="Transistor"
            src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-900.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Reform"
            src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-900.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Tuple"
            src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-900.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <img
            alt="SavvyCal"
            src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-900.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
          />
          <img
            alt="Statamic"
            src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-900.svg"
            width={158}
            height={48}
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
          />
        </div>
      </div>
    </div>
  
  </>
  )
}

export default home
