<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let email = 'tommaso.bocchietti@gmail.com';
	let password = 'Superme01.';

	onMount(() => {
		if (form?.success) {
			goto('/');
		}
	});
</script>

<Card.Root class="mx-auto max-w-sm">
	<form method="POST">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
		</Card.Header>

		<Card.Content>
			<div class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						type="email"
						name="email"
						bind:value={email}
						placeholder="tommaso.bocchietti@gmail.com"
						required
					/>
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a
							href="reset-password"
							class="ml-auto inline-block text-sm underline"
						>
							Forgot your password?
						</a>
					</div>
					<Input
						id="password"
						type="password"
						name="password"
						bind:value={password}
						required
					/>
				</div>
				<Button
					type="submit"
					class="w-full"
				>
					Login
				</Button>
			</div>

			<div class="mt-4 text-center text-sm">
				Don't have an account?
				<a
					href="register"
					class="underline"
				>
					Sign up
				</a>
			</div>
		</Card.Content>
	</form>
</Card.Root>

{#if form?.success}
	<p>Succesfully logged in</p>
{:else}
	<p>{form?.statusText}</p>
{/if}
