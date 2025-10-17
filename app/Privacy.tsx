import React from "react";
import { View, Text, ScrollView } from "react-native";
import StstusBar from "@/Components/StstusBar";

export default function PrivacyPolicyScreen() {
  return (
    <View>
      <StstusBar />
    <ScrollView className="p-4 my-10">
      <View className="flex flex-col gap-3 ">
        {/* Introductory Text */}
        <Text className="font-[500] text-gray-500 text-sm mb-3">
          When you visit the Site, we collect certain information about your
          device, your interaction with the Site, and the information necessary
          to process your purchases. We may also collect additional information
          if you may also collect additional information if you
        </Text>

        {/* Minors Section */}
        <Text className="text-3xl text-black">Minors</Text>
        <Text className="font-[500] text-gray-500 text-sm mb-3">
          The Site is not intended for individuals under the age of 18. We do
          not intentionally collect Personal Information from children. If you
          are the parent or guardian and believe your child has provided us with
          Personal Information, please contact us at the address below to
          request deletion.
        </Text>

        {/* Sharing Personal Information Section */}
        <Text className="text-3xl text-black">Sharing Personal Information</Text>
        <Text className="font-[500] text-gray-500 text-sm">
          We share your Personal Information with service providers to help us
          provide our services and fulfill our contracts with you, as described
          above. For example:
        </Text>
        <View className="ml-4">
          <Text className="list-disc font-[500] text-gray-500 text-sm">
            • We use Shopify to power our online store. You can read more about
            how Shopify uses your Personal Information here:
            https://www.shopify.com/legal/privacy.
          </Text>
          <Text className="list-disc font-[500] text-gray-500 text-sm mb-3">
            • We may share your Personal Information to comply with applicable
            laws and regulations, to respond to a subpoena, search warrant, or
            other lawful request for information we receive, or to otherwise
            protect our rights.
          </Text>
        </View>

        {/* Using Personal Information Section */}
        <Text className="text-3xl text-black">Using Personal Information</Text>
        <Text className="font-[500] text-gray-500 text-sm mb-3">
          We use your personal Information to provide our services to you, which
          includes: offering products for sale, processing payments, shipping
          and fulfillment of your order, and keeping you up to date on new
          products, services, and offers.
        </Text>

        {/* Lawful Basis Section */}
        <Text className="text-3xl text-black">Lawful basis</Text>
        <Text className="font-[500] text-gray-500 text-sm">
          Pursuant to the General Data Protection Regulation (“GDPR”), if you
          are a resident of the European Economic Area (“EEA”), we process your
          personal information under the following lawful bases:
        </Text>
        <View className="ml-4">
          <Text className="list-disc font-[500] text-gray-500 text-sm">• Your consent</Text>
          <Text className="list-disc font-[500] text-gray-500 text-sm">
            • The performance of the contract between you and the Site
          </Text>
          <Text className="list-disc font-[500] text-gray-500 text-sm">
            • Compliance with our legal obligations
          </Text>
          <Text className="list-disc font-[500] text-gray-500 text-sm">
            • To protect your vital interests
          </Text>
          <Text className="list-disc font-[500] text-gray-500 text-sm">
            • To perform a task carried out in the public interest
          </Text>
          <Text className="list-disc font-[500] text-gray-500 text-sm">
            • For our legitimate interests, which do not override your
            fundamental rights and freedoms
          </Text>
        </View>
      </View>
    </ScrollView>
    </View>
  );
};

// export default PrivacyPolicyScreen;
