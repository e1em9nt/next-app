'use client';

import { useState} from "react";
import { Button } from "@/app/shared/ui/button";
import { Input } from "@/app/shared/ui/input";
import { Label } from "@/app/shared/ui/label";
import { EyeOffIcon, EyeIcon } from "lucide-react";

import { LoginSchema ,type LoginSchemaData } from "./auth.schemas";

export const LoginForm = () => {
    const [isVisible, setIsVisible] = useState(false)

    return (
    <form className='space-y-4' onSubmit={e => e.preventDefault()}>
      {/* Email */}
      <div className='space-y-1'>
        <Label htmlFor='userEmail' className='leading-5'>
          Email address*
        </Label>
        <Input type='email' id='userEmail' placeholder='Enter your email address' />
      </div>

      {/* Password */}
      <div className='w-full space-y-1'>
        <Label htmlFor='password' className='leading-5'>
          Password*
        </Label>
        <div className='relative'>
          <Input id='password' type={isVisible ? 'text' : 'password'} placeholder='••••••••••••••••' className='pr-9' />
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsVisible(prevState => !prevState)}
            className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
          </Button>
        </div>
      </div>
      </form>
    );
}