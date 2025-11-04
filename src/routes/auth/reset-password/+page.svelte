<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let loading = false;
</script>

<svelte:head>
	<title>Reset Password</title>
</svelte:head>

<Card.Root class="mx-auto max-w-sm">
	<form
		method="POST"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				await update();
				loading = false;
			};
		}}
	>
		<Card.Header>
			<Card.Title class="text-2xl">Reset Password</Card.Title>
			<Card.Description>
				Enter your email address and we'll send you a link to reset your password
			</Card.Description>
		</Card.Header>

		<Card.Content>
			{#if form?.success}
				<div class="mb-4 rounded-lg bg-green-500/10 p-3 text-sm text-green-600">
					Password reset link sent! Check your email.
				</div>
			{/if}

			{#if form?.error}
				<div class="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
					{form.error}
				</div>
			{/if}

			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						type="email"
						name="email"
						value={form?.email ?? ''}
						placeholder="you@example.com"
						required
						disabled={loading}
						class={form?.errors?.email ? 'border-destructive' : ''}
					/>
					{#if form?.errors?.email}
						<p class="text-sm text-destructive">{form.errors.email[0]}</p>
					{/if}
				</div>

				<Button
					type="submit"
					class="w-full"
					disabled={loading}
				>
					{loading ? 'Sending...' : 'Send Reset Link'}
				</Button>
			</div>

			<div class="mt-4 text-center text-sm">
				Remember your password?
				<a
					href="/auth/login"
					class="underline"
				>
					Sign in
				</a>
			</div>
		</Card.Content>
	</form>
</Card.Root>
