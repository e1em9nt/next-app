import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/shared/ui/tabs';
import { LoginForm } from '@/app/features/auth';

export default function AuthPage() {
  return (
    <main className="px-5 py-10">
      <Tabs defaultValue="login" className="flex flex-col gap-8 w-full max-w-md mx-auto">
        <TabsList className="self-center space-x-4">
          <TabsTrigger value="login" className="w-30">
            Log in
          </TabsTrigger>
          <TabsTrigger value="signup" className="w-30">
            Sign up
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup">
          <div>Sign up</div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
