import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Input,
  Button,
  Stack,
  useColorModeValue,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useGetAllResumeAPI from "@/app/resume/_api/useGetAllResumeApi";
import searchGames from "./SearchResult";
import { Resume } from "../Interface/IResumeCard";

let searchResults: Resume[] = [];

const SearchBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [isSet, onSet] = useState(false);
  const [search, openSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [{ data, isLoading, isError }] = useGetAllResumeAPI();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // router.refresh();
      router.push("/search");
    }
  };

  if (isSet == false) {
    if (data) {
      searchResults = data;
      onSet(true);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    console.log(newQuery);
    setQuery(newQuery);
    if (data) {
      const results = searchGames(newQuery, data);
      // setSearchResults(results);
      searchResults = results;
    }
  };

  const router = useRouter();

  return (
    <>
      <Flex
        bg="black"
        alignItems={"center"}
        justifyContent={"center"}
        textColor={"white"}
        pt="6"
        pb="2"
        display={{ base: "none", md: "flex" }}
      >
        <Flex width="75vw" alignItems={"center"}>
          <Flex
            mr={4}
            _hover={{ color: "blue.500" }}
            cursor={"pointer"}
            fontSize={"xl"}
            fontWeight={"800"}
            onClick={() => router.push("/")}
          >
            Home
          </Flex>
          <Input
            ml={4}
            width="400px"
            type={"text"}
            placeholder={"Tìm kiếm"}
            color={useColorModeValue("gray.200", "gray.700")}
            bg={useColorModeValue("#171717", "gray.600")}
            rounded={"full"}
            border={0}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            _focus={{
              bg: useColorModeValue("gray.800", "gray.200"),
              outline: "gray.200",
            }}
          />
        </Flex>
      </Flex>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        display={{ base: "flex", md: "none" }}
      >
        <Icon
          m={4}
          as={SearchIcon}
          onClick={() => openSearch(true)}
          display={search ? "none" : "flex"}
          transition={"all .25s ease-in-out"}
        />
        <Input
          m={4}
          onClick={() => openSearch(true)}
          display={search ? "flex" : "none"}
          transition={"all .25s ease-in-out"}
          width="50vw"
          type={"text"}
          placeholder={"Tìm kiếm"}
          color={useColorModeValue("gray.200", "gray.700")}
          bg={useColorModeValue("#171717", "gray.600")}
          rounded={"full"}
          border={0}
          _focus={{
            bg: useColorModeValue("gray.800", "gray.200"),
            outline: "gray.200",
          }}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Menu variant={"black"}>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"black"}
            cursor={"pointer"}
            onClick={onToggle}
            minW={0}
          >
            Home
            <Icon
              as={ChevronDownIcon}
              transition={"all .25s ease-in-out"}
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          </MenuButton>
          <MenuList bg={"black"} border={"none"}>
            <MenuItem bg={"black"}>Discover</MenuItem>
            <MenuItem bg={"black"}>Browser</MenuItem>
            {/* <MenuItem bg={"black"}>Browser</MenuItem> */}
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};

export default SearchBar;
export { searchResults };
