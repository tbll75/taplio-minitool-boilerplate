import React, { useState, useEffect } from "react";
import { Layout, Hero, QuestionAnswers } from "components";
import { signIn, useSession, signOut } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();

  return (
    <Layout>
      <Hero />
      <QuestionAnswers />
    </Layout>
  );
}

export default Home;
