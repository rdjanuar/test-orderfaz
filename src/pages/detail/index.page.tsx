import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  HStack,
  Heading,
  SimpleGrid,
  Tag,
  Text,
  chakra,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useDetail } from "./hook/useDetail";
import { getCallingCode, getCurrencies, getDetailCountry } from "./service";
import Image from "next/image";

const Detail = () => {
  const { detailData, currencies, callingCode } = useDetail();

  return (
    <Container
      maxW="full"
      py="90px"
      px={{
        base: "20px",
        lg: "90px",
      }}
    >
      <Button
        as={Link}
        href="/"
        w="229px"
        leftIcon={<ArrowBackIcon boxSize="24px" color="white" />}
        rounded="10px"
        h="50px"
        colorScheme="button.primary"
      >
        <Text color="white" fontSize="18px" lineHeight="21.48px">
          Back To HomePage
        </Text>
      </Button>
      <VStack mt="50px" align="start">
        <HStack position="relative" flexWrap="wrap">
          <Heading fontSize="48px" lineHeight="57.28px">
            {detailData?.[0].name.common!}
          </Heading>

          <Image
            src={detailData?.[0].flags.png!}
            alt={detailData?.[0].flags.alt as string}
            style={{
              objectFit: "cover",
              width: 46,
              height: 30,
            }}
            width={46}
            height={30}
          />
        </HStack>
        <HStack flexWrap="wrap">
          {detailData?.[0].altSpellings.map((val) => (
            <Tag
              key={val}
              bg="#8DD4CC"
              color="white"
              display="flex"
              justifyContent="center"
              textAlign="center"
              rounded="50px"
              fontSize="12px"
              lineHeight="14.32px"
            >
              {val}
            </Tag>
          ))}
        </HStack>
      </VStack>
      <SimpleGrid
        columns={{
          base: 1,
          lg: 2,
        }}
        spacingY={{
          base: 10,
          lg: 0,
        }}
        spacingX="10px"
        mt="25px"
      >
        <Card
          w="100%"
          h="143px"
          rounded="5px"
          shadow="none"
          filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.02)) drop-shadow(-4px -4px 4px  rgba(0, 0, 0, 0.02));"
        >
          <CardBody py="25px" pl="25px" position="relative">
            <Heading fontSize="18px" fontWeight="medium" lineHeight="21.48px">
              LatLong
            </Heading>
            <Text
              fontSize="48px"
              lineHeight="57.28px"
              fontWeight="bold"
              color="button.primary.500"
            >
              {detailData?.[0].latlng.join(", ")}
            </Text>
            <svg
              width="204"
              height="121"
              style={{
                position: "absolute",
                right: 0,
                top: 22,
              }}
              viewBox="0 0 204 121"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M204 102.5C204 108.281 203.521 113.95 202.601 119.469C201.691 120.413 200.414 121 199 121H154.555C154.043 117.986 151.424 115.692 148.27 115.692H144.893C142.763 115.692 140.772 114.624 139.592 112.848L134.146 104.664C131.814 101.157 133.443 96.3925 137.433 95.0614L138.523 94.6988C139.444 94.3919 140.423 94.2995 141.385 94.4288C142.347 94.558 143.267 94.9055 144.075 95.4447L151.565 100.448C152.499 101.073 153.583 101.44 154.705 101.51C155.826 101.58 156.947 101.352 157.952 100.847L164.282 97.6742C166.441 96.5945 167.806 94.3814 167.806 91.9624V89.1064C167.806 85.5788 170.661 82.7188 174.181 82.7188H181.762C173.918 50.9946 147.748 26.5194 115.165 21.2279V30.1707C115.165 33.6983 112.311 36.5584 108.79 36.5584H98.8331C96.7026 36.5584 94.7119 37.6257 93.5315 39.4019L90.2083 44.3926C89.3281 45.7155 87.9873 46.6592 86.4491 47.0466L80.506 48.5343C77.6681 49.2472 75.6774 51.8023 75.6774 54.7324V56.5457C75.6774 60.0733 78.5318 62.9334 82.0524 62.9334H119.089C119.926 62.9332 120.755 63.0984 121.529 63.4194C122.302 63.7405 123.005 64.2111 123.597 64.8044L126.443 67.6562C127.64 68.8554 129.26 69.5271 130.951 69.5271H135.101C138.621 69.5271 141.476 72.3872 141.476 75.9148C141.476 78.6636 139.719 81.1033 137.116 81.9728L117.658 88.4718C116.054 89.0075 114.306 88.8839 112.792 88.1256L106.738 85.0925C103.62 83.5265 100.178 82.7146 96.6902 82.7146H96.3242C91.4623 82.7159 86.7318 84.2963 82.8421 87.219L71.4987 95.7455C65.8435 99.9985 62.512 106.671 62.512 113.755V119.549C62.5121 120.034 62.5278 120.518 62.5589 121H1.66667C0.571906 115 0 108.817 0 102.5C0 46.0534 45.6656 0.296875 102 0.296875C158.334 0.296875 204 46.0534 204 102.5Z"
                fill="black"
                fillOpacity="0.04"
              />
            </svg>
          </CardBody>
        </Card>
        <Card
          w="100%"
          h="143px"
          rounded="5px"
          shadow="none"
          filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.02)) drop-shadow(-4px -4px 4px  rgba(0, 0, 0, 0.02));"
        >
          <CardBody py="32px" pl="27px">
            <VStack alignItems="start" spacing="8px">
              <Text fontSize="18px" fontWeight="normal" lineHeight="21.48px">
                Capital:{" "}
                <chakra.span fontWeight="medium">
                  {detailData?.[0]?.capital
                    ? detailData?.[0]?.capital?.join(", ")
                    : "-"}
                </chakra.span>
              </Text>
              <Text fontSize="18px" fontWeight="normal" lineHeight="21.48px">
                Region:{" "}
                <chakra.span fontWeight="medium">
                  {detailData?.[0].region}
                </chakra.span>
              </Text>
              <Text fontSize="18px" fontWeight="normal" lineHeight="21.48px">
                Subregion:{" "}
                <chakra.span fontWeight="medium">
                  {detailData?.[0].subregion}
                </chakra.span>
              </Text>
            </VStack>
          </CardBody>
        </Card>
        <Box w="100%" h="143px" bg="transparent" mt="40px">
          <Heading fontSize="18px" lineHeight="21.48px">
            Calling Code
          </Heading>
          <Text
            fontSize="48px"
            mt="5px"
            mb="11px"
            wordBreak="break-all"
            lineHeight="57.28px"
            fontWeight="bold"
            color="button.primary.500"
          >
            {`${detailData?.[0].idd.root.replace("+", "")}`}
            {`${
              detailData?.[0].idd.suffixes.length! > 5
                ? ""
                : detailData?.[0].idd.suffixes
            }`}
          </Text>

          <HStack spacing={1}>
            <Tooltip
              label={
                <VStack align="start" spacing="10px">
                  {callingCode?.map((el) => (
                    <Text key={el.name}>{el.name}</Text>
                  ))}
                </VStack>
              }
              rounded="10px"
              bg="#525252"
              ml="5"
              openDelay={300}
              p="20px"
            >
              <Text
                color="button.primary.500"
                fontWeight="medium"
                fontSize="14px"
                lineHeight="16.71px"
                textDecoration="underline"
              >
                {callingCode?.length} countries
              </Text>
            </Tooltip>
            <Text>with this calling code</Text>
          </HStack>
        </Box>
        <Box w="100%" h="143px" bg="transparent" mt="40px">
          <Heading fontSize="18px" lineHeight="21.48px">
            Currency
          </Heading>
          <Text
            fontSize="48px"
            mt="5px"
            mb="11px"
            lineHeight="57.28px"
            fontWeight="bold"
            color="button.primary.500"
          >
            {Object.keys(detailData?.[0].currencies!).join(", ")}
          </Text>
          <HStack spacing={1}>
            <Tooltip
              label={
                <VStack align="start" spacing="10px">
                  {currencies?.map((el) => (
                    <Text key={el.name}>{el.name}</Text>
                  ))}
                </VStack>
              }
              openDelay={300}
              rounded="10px"
              bg="#525252"
              p="20px"
            >
              <Text
                color="button.primary.500"
                fontWeight="medium"
                fontSize="14px"
                lineHeight="16.71px"
                textDecoration="underline"
              >
                {currencies?.length} countries
              </Text>
            </Tooltip>
            <Text>with this currency</Text>
          </HStack>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  const query = ctx.query;

  await Promise.allSettled([
    queryClient.prefetchQuery(["detail", query.country], () =>
      getDetailCountry(query.country as unknown as string)
    ),
    queryClient.prefetchQuery(["currencies", query.currencies], () =>
      getCurrencies(query.currencies as unknown as string)
    ),
    queryClient.prefetchQuery(["callingCode", query.callingCode], () =>
      getCallingCode(query.callingCode as unknown as string)
    ),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Detail;
