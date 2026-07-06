import json
import os

log_file = r"C:\Users\Rishi Sharma\.gemini\antigravity\brain\7ce203d2-d3ef-40ce-962e-551e8107239b\.system_generated\logs\transcript_full.jsonl"
output_dir = r"C:\Users\Rishi Sharma\.gemini\antigravity\brain\7ce203d2-d3ef-40ce-962e-551e8107239b\scratch"

def extract_original_files():
    if not os.path.exists(log_file):
        print(f"Log file not found")
        return
        
    targets = {
        "crop_service": "CROP_PROFILES = {",
        "disease_service": "DISEASE_PROFILES = {",
        "treatment_service": "TREATMENT_PROFILES = {",
        "recommendation_service": "RECOMMENDATION_PROFILES = {"
    }
    
    found = {}
    with open(log_file, "r", encoding="utf-8") as f:
        for line in f:
            for name, token in targets.items():
                if token in line and name not in found:
                    found[name] = line
                    
    for name, line_content in found.items():
        try:
            data = json.loads(line_content)
            code = ""
            if "tool_calls" in data:
                for tc in data["tool_calls"]:
                    args = tc.get("args", {})
                    if "CodeContent" in args:
                        code = args["CodeContent"]
                        break
            
            if code:
                out_path = os.path.join(output_dir, f"original_{name}.py")
                with open(out_path, "w", encoding="utf-8") as out_f:
                    out_f.write(code)
                print(f"Successfully extracted {name} to {out_path} ({len(code)} bytes)")
            else:
                print(f"Could not find code content block for {name}")
        except Exception as e:
            print(f"Error parsing line for {name}: {str(e)}")

if __name__ == "__main__":
    extract_original_files()
