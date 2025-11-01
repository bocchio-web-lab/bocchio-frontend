<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card/index';
	import { Button } from '$lib/components/ui/button/index';
</script>

<Card.Header>
	<Card.Title>Select your role</Card.Title>
</Card.Header>

<Card.Content class="grid gap-6">
	<Button
		class="w-full"
		href="/apps/private-tutoring/student"
	>
		Student
	</Button>
	<Button
		class="w-full"
		href="/apps/private-tutoring/tutor"
	>
		Tutor
	</Button>
</Card.Content>
