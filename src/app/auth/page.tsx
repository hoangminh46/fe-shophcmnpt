import MainLayout from "@/app/layouts/MainLayout";
import LoginForm from "@/components/core/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Auth() {
  return (
    <MainLayout>
      <div className="py-10">
        <Tabs defaultValue="login" className="w-[464px] mx-auto px-5">
          <TabsList className="w-full bg-transparent h-full p-0">
            <TabsTrigger value="login" className="w-1/2 p-4 text-lg">
              Đăng nhập
            </TabsTrigger>
            <TabsTrigger value="register" className="w-1/2 p-4 text-lg">
              Đăng ký
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
