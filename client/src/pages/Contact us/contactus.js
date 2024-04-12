import React from 'react'

function contactus() {
    return (
        <div class="bg-white dark:bg-zinc-800">
            <div class="container mx-auto px-4 py-8">
                <div class="text-center mb-8">
                    <h1 class="text-4xl font-bold">CONTACT US</h1>
                    <p class="mt-4">Are you planning a stay with us? Get in touch via phone or email to make your reservation today!</p>
                    <p>Stay connected with us to find out the latest buzz and special offers at The Kingsbury.</p>
                </div>
                <form class="w-full max-w-3xl mx-auto">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-zinc-700 dark:text-zinc-200 text-xs font-bold mb-2" for="title">
                                Title *
                            </label>
                            <div class="relative">
                                <select class="block appearance-none w-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-zinc-500" id="title">
                                    <option>Mr.</option>
                                    <option>Ms.</option>
                                    <option>Mrs.</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-700 dark:text-zinc-300">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M5.516 7.548c.436-.446 1.045-.481 1.576 0 .493.463.525 1.159.062 1.639L5.576 11H14.5c.827 0 1.5.673 1.5 1.5S15.327 14 14.5 14h-9c-.276 0-.5.224-.5.5s.224.5.5.5h9c1.378 0 2.5-1.121 2.5-2.5s-1.122-2.5-2.5-2.5H5.576l1.578 1.813c.463.48.431 1.176-.062 1.639-.532.481-1.141.446-1.576 0L2.231 9.5l3.285-1.952z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="w-full md:w-1/3 px-3">
                            <label class="block uppercase tracking-wide text-zinc-700 dark:text-zinc-200 text-xs font-bold mb-2" for="first-name">
                                First Name *
                            </label>
                            <input class="appearance-none block w-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="first-name" type="text" placeholder="Jane"></input>
                        </div>
                        <div class="w-full md:w-1/3 px-3">
                            <label class="block uppercase tracking-wide text-zinc-700 dark:text-zinc-200 text-xs font-bold mb-2" for="last-name">
                                Last Name *
                            </label>
                            <input class="appearance-none block w-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="last-name" type="text" placeholder="Doe">
                            </input></div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-zinc-700 dark:text-zinc-200 text-xs font-bold mb-2" for="phone">
                                Phone *
                            </label>
                            <input class="appearance-none block w-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="phone" type="text" placeholder="123-456-7890">
                            </input></div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-zinc-700 dark:text-zinc-200 text-xs font-bold mb-2" for="email">
                                Email *
                            </label>
                            <input class="appearance-none block w-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="email" type="email" placeholder="jane.doe@example.com">
                            </input></div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-zinc-700 dark:text-zinc-200 text-xs font-bold mb-2" for="country">
                                Country *
                            </label>
                            <div class="relative">
                                <select class="block appearance-none w-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-zinc-500" id="country">
                                    <option>Please Select</option>
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>United Kingdom</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-700 dark:text-zinc-300">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M5.516 7.548c.436-.446 1.045-.481 1.576 0 .493.463.525 1.159.062 1.639L5.576 11H14.5c.827 0 1.5.673 1.5 1.5S15.327 14 14.5 14h-9c-.276 0-.5.224-.5.5s.224.5.5.5h9c1.378 0 2.5-1.121 2.5-2.5s-1.122-2.5-2.5-2.5H5.576l1.578 1.813c.463.48.431 1.176-.062 1.639-.532.481-1.141.446-1.576 0L2.231 9.5l3.285-1.952z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-zinc-700 dark:text-zinc-200 text-xs font-bold mb-2" for="subject">
                                Subject
                            </label>
                            <input class="appearance-none block w-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="subject" type="text" placeholder="Inquiry">
                            </input> </div>
                    </div>
                    <div class="flex justify-center mt-8">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default contactus