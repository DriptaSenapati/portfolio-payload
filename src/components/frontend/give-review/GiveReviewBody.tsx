'use client'

import React, { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Check, Loader2 } from 'lucide-react'
import { submitReview } from '@/actions/giveReviewActions'
import { toast } from 'sonner'
import Link from 'next/link'
import { ReviewLink } from '@/payload-types'
import moment from 'moment'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(2),
  rating: z.number().min(1),
  feedback: z.string().max(200),
  workedAs: z.string(),
})

type Props = {
  reviewLinkId: string
  targetUserData: ReviewLink
}

const GiveReviewBody = ({ reviewLinkId, targetUserData }: Props) => {
  const [remainingTime, setRemainingTime] = useState('00:00')
  const timer = useRef<NodeJS.Timeout>(null)
  const firstMount = useRef(true)
  const [formExpired, setFormExpired] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: '',
      name: targetUserData.targetName,
      rating: 1,
      workedAs: 'Member of Project',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await submitReview(values, reviewLinkId)

    if (result.success) {
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }

    form.reset()
  }

  const feedbackString = form.watch('feedback')

  const updateTimer = () => {
    const deadTimer = moment(targetUserData.expirationTime)
    const diffSec = deadTimer.diff(moment(), 'seconds')

    const mm = Math.floor(diffSec / 60)
      .toString()
      .padStart(2, '0')
    const ss = (diffSec % 60).toString().padStart(2, '0')
    if (diffSec === 0) {
      setFormExpired(true)
    }
    setRemainingTime(`${mm}:${ss}`)
  }

  useEffect(() => {
    updateTimer()
    timer.current = setInterval(updateTimer, 1000)
    firstMount.current = false
    return () => {
      if (timer.current) {
        clearInterval(timer.current)
      }
    }
  }, [])

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-[50vw] space-y-10 max-w-[800px] max-md:w-[90vw]">
        <Link href={'/'}>
          <Button variant={'outline'}>
            <ArrowLeft />
            Back to main website
          </Button>
        </Link>
        <div className="h-2"></div>
        <h3 className="text-center">{`Hi ${targetUserData.targetName}, Provide Feedback to Dripta`}</h3>
        {!formExpired && !form.formState.isSubmitSuccessful && (
          <p className="text-background-2 text-sm">{`Form expires in: ${remainingTime}`}</p>
        )}
        {!formExpired && !form.formState.isSubmitSuccessful ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Rating</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        required
                        min={1}
                        max={5}
                        onChange={(val) => field.onChange(parseInt(val.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Rating should be between 1 and 5</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Feedback</FormLabel>

                    <div className="relative">
                      <FormControl>
                        <Textarea required maxLength={200} {...field} className="max-w-[800px]" />
                      </FormControl>
                      <div className="absolute right-0 bottom-0 translate-y-[110%] text-background-2 text-sm">
                        {feedbackString ? (feedbackString as string).split('').length : 0}/{200}
                      </div>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workedAs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Worked As</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} required />
                    </FormControl>
                    <FormDescription>
                      e.g: Member of Project, Partner of ABC Project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center items-center">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
                  Submit Review
                </Button>
              </div>
            </form>
          </Form>
        ) : form.formState.isSubmitSuccessful ? (
          <Alert variant="default">
            <Check className="h-4 w-4" />
            <AlertTitle>Thanks</AlertTitle>
            <AlertDescription>Thank you very much for giving me feedback</AlertDescription>
          </Alert>
        ) : (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Invalid Link</AlertTitle>
            <AlertDescription>Link has expired. Please connect with website owner</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}

export default GiveReviewBody
