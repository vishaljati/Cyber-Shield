import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard/Dashboard";

const Index = () => {
  return (
    <Layout>
      <Header
        title="Dashboard"
        subtitle="Monitor your browsing protection in real-time"
      />
      <Dashboard />
    </Layout>
  );
};

export default Index;
