import {router, usePage} from '@inertiajs/react';
import React, { useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { classNames } from 'primereact/utils';

import logo from '../../assets/codelocks.png'
import avatar from '../../assets/av-1.jpg'


const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const {_token} = usePage().props

    const containerClassName = classNames('surface-ground flex items-center justify-center min-h-screen min-w-screen overflow-hidden');

    return (
        <div className={containerClassName}>
            <div className="flex flex-col items-center justify-center">
                <img src={logo} alt="Sakai logo" className="mb-5 w-[6rem] shrink-0" />
                <div
                    className='rounded-[4rem] p-[.3rem]'
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <form method="POST" action={ route('login') }>
                        <input type='hidden' value={_token} name='_token'/>
                        <div className="w-full bg-white py-8 px-5 sm:px-8" style={{borderRadius: '53px'}}>
                            <div className="text-center mb-5">
                                <Avatar image={avatar} className="mb-3" shape="circle" size="large"/>
                                <div className="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                                <span className="text-600 font-medium">Sign in to continue</span>
                            </div>

                            <div>
                                <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                    Email
                                </label>
                                <InputText id="email1" type="text" placeholder="Email address" name='email'
                                           className="w-full md:w-[30rem] mb-5" style={{padding: '1rem'}}/>

                                <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                    Password
                                </label>
                                <InputText type='password' inputId="password1" value={password} name='password'
                                           onChange={(e) => setPassword(e.target.value)} placeholder="password"
                                           className="w-full mb-5"
                                           inputClassName="w-full p-3 md:w-[30rem]"></InputText>

                                <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                    <div className="flex align-items-center">
                                        <Checkbox inputId="rememberme1" checked={checked} name='rememberme'
                                                  onChange={(e) => setChecked(e.checked ?? false)}
                                                  className="mr-2"></Checkbox>
                                        <label htmlFor="rememberme1">Remember me</label>
                                    </div>
                                    <a className="font-medium no-underline ml-2 text-right cursor-pointer"
                                       style={{color: 'var(--primary-color)'}}>
                                        Forgot password?
                                    </a>
                                    <a className="font-medium no-underline ml-2 text-right cursor-pointer"
                                       style={{color: 'var(--primary-color)'}}>
                                        Register
                                    </a>
                                </div>
                                <Button label="Sign In" className="w-full p-3 text-xl"
                                        onClick={() => router.visit('/')}></Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;