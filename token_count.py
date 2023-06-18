import tiktoken 
encoding = tiktoken.get_encoding("cl100k_base")
encoding = tiktoken.encoding_for_model("text-davinci-003")

def num_tokens_from_string(string: str, encoding_name: str) -> int:
    """Returns the number of tokens in a text string."""
    encoding = tiktoken.get_encoding(encoding_name)
    num_tokens = len(encoding.encode(string))
    return num_tokens

def compare_encodings(example_string: str) -> None:
    """Prints a comparison of three string encodings."""
    # print the example string
    print(f'\nExample string: "{example_string}"')
    # for each encoding, print the # of tokens, the token integers, and the token bytes
    for encoding_name in ["gpt2", "p50k_base", "cl100k_base"]:
        encoding = tiktoken.get_encoding(encoding_name)
        token_integers = encoding.encode(example_string)
        num_tokens = len(token_integers)
        token_bytes = [encoding.decode_single_token_bytes(token) for token in token_integers]
        print()
        print(f"{encoding_name}: {num_tokens} tokens")
        print(f"token integers: {token_integers}")
        print(f"token bytes: {token_bytes}")
      
print(num_tokens_from_string("Cats, known for their independent nature and captivating charm, have been companions to humans for thousands of years. With their soft fur, enigmatic eyes, and graceful movements, cats have a unique ability to captivate and delight us. Domesticated cats come in various breeds, each with its distinct characteristics and personalities. They are often cherished as loving pets that provide companionship and comfort. Cats are natural hunters, known for their agility and stealth. They possess sharp claws and teeth, which they use for grooming, play, and self-defense. Their ability to adapt to different environments and their mysterious allure continue to make cats one of the most beloved animals worldwide.", "gpt2"))
