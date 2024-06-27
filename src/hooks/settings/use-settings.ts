import { onChatBotImageUpdate, onDeleteUserDomain, onUpdateDomain, onUpdatePassword, onUpdateWelcomeMessage } from '@/actions/settings'
import { useToast } from '@/components/ui/use-toast'
import { ChangePasswordProps, ChangePasswordSchema } from '@/schemas/auth.schema'
import { DomainSettingsProps, DomainSettingsSchema } from '@/schemas/settings.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadClient } from '@uploadcare/upload-client'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const upload = new UploadClient({
	publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
})

export const useThemeMode = () => {
	const { setTheme, theme } = useTheme()

	return {
		setTheme,
		theme,
	}
}


export const useChangePassword = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ChangePasswordProps>({
		resolver: zodResolver(ChangePasswordSchema),
		mode: 'onChange',
	})
	const { toast } = useToast()
	const [loading, setLoading] = useState<boolean>(false)

	const onChangePassword = handleSubmit(async (values) => {
		try {
			setLoading(true)
			const updated = await onUpdatePassword(values.password)
			if (updated) {
				reset()
				setLoading(false)
				toast({ title: 'Success', description: updated.message })
			}
		} catch (error) {
			console.log(error)
		}
	})
	return {
		register,
		errors,
		onChangePassword,
		loading,
	}
}


export const useSettings = (id: string) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<DomainSettingsProps>({
		resolver: zodResolver(DomainSettingsSchema),
	})
	const router = useRouter()
	const { toast } = useToast()
	const [loading, setLoading] = useState<boolean>(false)
	const [deleting, setDeleting] = useState<boolean>(false)

	const onUpdateSettings = handleSubmit(async (values) => {
		setLoading(true)
		if (values.domain) {
			const domain = await onUpdateDomain(id, values.domain)
			if (domain) {
				toast({
					title: 'Success',
					description: domain.message,
				})
			}
		}
		if (values.image[0]) {
			const uploaded = await upload.uploadFile(values.image[0])
			const image = await onChatBotImageUpdate(id, uploaded.uuid)
			if (image) {
				toast({
					title: image.status == 200 ? 'Success' : 'Error',
					description: image.message,
				})
				setLoading(false)
			}
		}
		if (values.welcomeMessage) {
			const message = await onUpdateWelcomeMessage(values.welcomeMessage, id)
			if (message) {
				toast({
					title: 'Success',
					description: message.message,
				})
			}
		}
		reset()
		router.refresh()
		setLoading(false)
	})

	const onDeleteDomain = async () => {
		setDeleting(true)
		const deleted = await onDeleteUserDomain(id)
		if (deleted) {
			toast({
				title: 'Success',
				description: deleted.message,
			})
			setDeleting(false)
			router.refresh()
		}
	}
	return {
		register,
		onUpdateSettings,
		errors,
		loading,
		onDeleteDomain,
		deleting,
	}
}

/*
	*** update the domain name, chatbot image, and welcome message in a single call to the backend,
	you can combine these updates into a single function. ***

export const useSettings = (id: string) => {
  const {
	register,
	handleSubmit,
	formState: { errors },
	reset,
  } = useForm<DomainSettingsProps>({
	resolver: zodResolver(DomainSettingsSchema),
  })
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)

  const onUpdateSettings = handleSubmit(async (values) => {
	setLoading(true)
    
	try {
	  const updates = {
		domain: values.domain,
		image: values.image[0] ? await upload.uploadFile(values.image[0]).then(uploaded => uploaded.uuid) : null,
		welcomeMessage: values.welcomeMessage,
	  }

	  const response = await onUpdateDomainSettings(id, updates)

	  if (response.status === 200) {
		toast({
		  title: 'Success',
		  description: response.message,
		})
	  } else {
		toast({
		  title: 'Error',
		  description: response.message,
		})
	  }
	} catch (error) {
	  toast({
		title: 'Error',
		description: 'An error occurred while updating settings.',
	  })
	  console.error(error)
	} finally {
	  setLoading(false)
	  reset()
	  router.refresh()
	}
  })

  return {
	register,
	onUpdateSettings,
	errors,
	loading,
	deleting,
  }
}

export const onUpdateDomainSettings = async (id: string, updates: { domain?: string, image?: string, welcomeMessage?: string }) => {
  try {
	// Check if domain with name exists
	if (updates.domain) {
	  const domainExists = await client.domain.findFirst({
		where: {
		  name: {
			contains: updates.domain,
		  },
		},
	  })

	  if (domainExists) {
		return {
		  status: 400,
		  message: 'Domain with this name already exists',
		}
	  }
	}

	// Perform the update
	const updatedData: any = {}
	if (updates.domain) updatedData.name = updates.domain
	if (updates.image) updatedData.chatBot = { update: { data: { icon: updates.image } } }
	if (updates.welcomeMessage) updatedData.chatBot = { ...updatedData.chatBot, update: { data: { welcomeMessage: updates.welcomeMessage } } }

	const domain = await client.domain.update({
	  where: { id },
	  data: updatedData,
	})

	if (domain) {
	  return {
		status: 200,
		message: 'Domain settings updated',
	  }
	}

	return {
	  status: 400,
	  message: 'Oops something went wrong!',
	}
  } catch (error) {
	console.log(error)
	return {
	  status: 500,
	  message: 'Internal server error',
	}
  }
}

*/