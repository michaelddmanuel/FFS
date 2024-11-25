import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import names

def generate_agent_data(num_agents):
    agents = []
    for i in range(num_agents):
        name = names.get_full_name()
        code = f'AG{str(i+1).zfill(4)}'
        agents.append({'name': name, 'code': code})
    return agents

def generate_policy_number():
    return f'POL-{random.randint(100000, 999999)}'

def generate_id_number():
    return f'{random.randint(1000000000, 9999999999)}'

def generate_sample_data(num_agents, num_records_per_agent, week_start_date):
    agents = generate_agent_data(num_agents)
    data = []
    
    for agent in agents:
        # Generate "ON" (new policies) records
        num_ons = random.randint(1, num_records_per_agent)
        for _ in range(num_ons):
            customer_name = names.get_full_name()
            policy_amount = round(random.uniform(1000, 50000), 2)
            record_date = week_start_date + timedelta(days=random.randint(0, 6))
            
            data.append({
                'AgentName': agent['name'],
                'AgentCode': agent['code'],
                'PolicyNumber': generate_policy_number(),
                'CustomerIDNumber': generate_id_number(),
                'CustomerName': customer_name.split()[0],
                'CustomerSurname': customer_name.split()[1],
                'PolicyAmount': policy_amount,
                'CollectionMethod': random.choice(['Debit Order', 'Cash', 'EFT']),
                'PolicyStartDate': record_date.strftime('%Y-%m-%d'),
                'Type': 'ON',
                'Date': record_date.strftime('%Y-%m-%d')
            })
        
        # Generate "OFF" (cancelled policies) records
        num_offs = random.randint(0, num_ons // 2)  # Fewer cancellations than new policies
        for _ in range(num_offs):
            customer_name = names.get_full_name()
            policy_amount = round(random.uniform(1000, 50000), 2)
            record_date = week_start_date + timedelta(days=random.randint(0, 6))
            
            data.append({
                'AgentName': agent['name'],
                'AgentCode': agent['code'],
                'PolicyNumber': generate_policy_number(),
                'CustomerIDNumber': generate_id_number(),
                'CustomerName': customer_name.split()[0],
                'CustomerSurname': customer_name.split()[1],
                'PolicyAmount': policy_amount,
                'CollectionMethod': random.choice(['Debit Order', 'Cash', 'EFT']),
                'PolicyStartDate': record_date.strftime('%Y-%m-%d'),
                'Type': 'OFF',
                'Date': record_date.strftime('%Y-%m-%d')
            })
    
    return pd.DataFrame(data)

# Generate 5 different sample files
base_date = datetime(2024, 1, 1)
sample_sizes = [20, 50, 100, 500, 1000]  # Number of agents for each file

for i, num_agents in enumerate(sample_sizes):
    week_start = base_date + timedelta(weeks=i)
    records_per_agent = random.randint(3, 10)
    
    df = generate_sample_data(num_agents, records_per_agent, week_start)
    
    filename = f'sample_data_week_{i+1}_{num_agents}_agents.xlsx'
    df.to_excel(filename, index=False)
    print(f'Generated {filename} with {len(df)} records for {num_agents} agents')
