from transformers import AutoTokenizer, AutoModelForCausalLM
import torch


class LocalLLM:

    def __init__(self, model_name="Qwen/Qwen2.5-3B-Instruct"):
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)

        self.model = AutoModelForCausalLM.from_pretrained(
            model_name,
            torch_dtype="auto",
            device_map="auto"
        )

    def generate(self, prompt, max_new_tokens=512):
        messages = [
            {
                "role": "system",
                "content": "You are a mathematics problem parser. Return only valid JSON when JSON output is requested."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]

        text = self.tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True
        )

        inputs = self.tokenizer(
            text,
            return_tensors="pt"
        ).to(self.model.device)

        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_new_tokens=max_new_tokens,
                do_sample=False
            )

        generated_tokens = outputs[0][inputs["input_ids"].shape[1]:]

        return self.tokenizer.decode(
            generated_tokens,
            skip_special_tokens=True
        )
