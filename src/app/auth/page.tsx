"use client";
import AuthLayout from "@/app/layouts/AuthLayout";
import LoginForm from "@/components/core/LoginForm";
import RegisterForm from "@/components/core/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function Auth() {
  const [currentTab, setCurrentTab] = useState("login");
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };

  useEffect(() => {
    const sessionExpired = searchParams.get('sessionExpired');
    
    if (sessionExpired === 'true') {
      localStorage.clear();
      
      dispatch({ type: 'RESET_STATE' });
    }
  }, [searchParams, dispatch]);

  return (
    <AuthLayout>
      <div className="py-10">
        <Tabs
          defaultValue={currentTab}
          value={currentTab}
          className="w-[464px] mx-auto px-5"
        >
          <TabsList className="w-full bg-transparent h-full p-0 mb-5">
            <TabsTrigger
              value="login"
              onClick={() => {
                handleTabChange("login");
              }}
              className="w-1/2 p-4 text-lg"
            >
              Đăng nhập
            </TabsTrigger>
            <TabsTrigger
              value="register"
              onClick={() => {
                handleTabChange("register");
              }}
              className="w-1/2 p-4 text-lg"
            >
              Đăng ký
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm onSwitchTab={() => handleTabChange("register")} />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm onSwitchTab={() => handleTabChange("login")} />
          </TabsContent>
        </Tabs>
      </div>
    </AuthLayout>
  );
}
