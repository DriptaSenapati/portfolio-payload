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
import { startReviewLinkVisitProcess, submitReview } from '@/actions/giveReviewActions'
import { toast } from 'sonner'
import Link from 'next/link'
import { ReviewLink } from '@/payload-types'
import moment, { min } from 'moment'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import useSWR from 'swr'
import { reviewLink_fetch_key } from '@/lib/swrKeys'

const formSchema = z.object({
  name: z.string().min(2),
  rating: z.number().min(1),
  feedback: z.string().max(200),
  workedAs: z.string(),
})

type Props = {
  reviewLinkId: string
}

const GiveReviewBody = ({ reviewLinkId }: Props) => {
  const [remainingTime, setRemainingTime] = useState('00:00:00')
  const timer = useRef<NodeJS.Timeout>(null)
  const [formExpired, setFormExpired] = useState(false)

  const { isLoading, data: targetUserData } = useSWR(reviewLink_fetch_key, () =>
    startReviewLinkVisitProcess(reviewLinkId),
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: '',
      name: targetUserData?.data?.targetName || '',
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
    const deadTimer = moment(targetUserData?.data?.expirationTime)
    const diffSec = deadTimer.diff(moment(), 'seconds')

    const ss = (diffSec % 60).toString().padStart(2, '0')
    const minute = Math.floor(diffSec / 60)
    const hh = Math.floor(minute / 60)
      .toString()
      .padStart(2, '0')
    const mm = (minute % 60).toString().padStart(2, '0')

    if (diffSec === 0) {
      setFormExpired(true)
    }
    setRemainingTime(`${hh}:${mm}:${ss}`)
  }

  useEffect(() => {
    if (!isLoading && targetUserData?.success) {
      updateTimer()
      timer.current = setInterval(updateTimer, 1000)
      form.setValue('name', targetUserData.data?.targetName || '')
    }
    if (!isLoading && !targetUserData?.success) {
      setFormExpired(true)
    }
    return () => {
      if (timer.current) {
        clearInterval(timer.current)
      }
    }
  }, [isLoading, targetUserData])

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

        {!formExpired && !form.formState.isSubmitSuccessful && (
          <p className="text-background-2 text-sm">{`Form expires in: ${remainingTime}`}</p>
        )}
        {isLoading && (
          <div className="flex justify-center items-center gap-2 w-full">
            <Loader2 className="animate-spin" />
            Getting form data. Please wait...
          </div>
        )}
        {!isLoading &&
          (!formExpired && !form.formState.isSubmitSuccessful ? (
            <>
              <h3 className="text-center">{`Hi ${targetUserData?.data?.targetName}, Provide Feedback to Dripta`}</h3>
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
                    render={({ field: { onChange, ...rest } }) => (
                      <FormItem>
                        <FormLabel required>Rating</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step={'0.1'}
                            {...rest}
                            required
                            min={1}
                            max={5}
                            onChange={(val) =>
                              Boolean(val.target.value)
                                ? onChange(Number(val.target.value))
                                : onChange('')
                            }
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
                            <Textarea
                              required
                              maxLength={370}
                              {...field}
                              className="max-w-[800px]"
                            />
                          </FormControl>
                          <div className="absolute right-0 bottom-0 translate-y-[110%] text-background-2 text-sm">
                            {feedbackString ? (feedbackString as string).split('').length : 0}/{370}
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
            </>
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
              <AlertDescription>
                Link has expired. Please connect with website owner
              </AlertDescription>
            </Alert>
          ))}
      </div>
    </div>
  )
}

export default GiveReviewBody
